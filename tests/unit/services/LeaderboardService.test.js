/**
 * Testes unitários para LeaderboardService
 */

jest.mock('../../../src/utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => next()),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const { LeaderboardService } = require('../../../src/services/LeaderboardService');
const { InMemoryLeaderboardRepository } = require('../../../src/repositories/InMemoryLeaderboardRepository');

describe('LeaderboardService', () => {
  let service;
  let repo;

  beforeEach(() => {
    repo = new InMemoryLeaderboardRepository();
    service = new LeaderboardService(repo);
  });

  describe('initUser', () => {
    it('deve inicializar score do usuário', () => {
      service.initUser('user-1', 'testuser');
      const stats = service.getUserStats('user-1');
      expect(stats).toBeDefined();
      expect(stats.score).toBe(0);
      expect(stats.completedPhases).toBe(0);
    });

    it('não deve reinicializar usuário existente', () => {
      service.initUser('user-1', 'testuser');
      service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      service.initUser('user-1', 'testuser'); // segunda chamada não deve resetar
      const stats = service.getUserStats('user-1');
      expect(stats.score).toBe(100);
    });
  });

  describe('completePhase', () => {
    it('deve atualizar score ao completar fase', () => {
      const stats = service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      expect(stats.score).toBe(100);
      expect(stats.completedPhases).toBe(1);
      expect(stats.timeSpent).toBe(60);
    });

    it('não deve contar a mesma fase duas vezes', () => {
      service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      const stats = service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      expect(stats.score).toBe(100);
      expect(stats.completedPhases).toBe(1);
    });

    it('deve acumular timeSpent mesmo para fase repetida', () => {
      service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      const stats = service.completePhase('user-1', 'testuser', 'fase1', 100, 30);
      expect(stats.timeSpent).toBe(90); // 60 + 30
    });

    it('deve calcular nível a cada 10 fases', () => {
      for (let i = 0; i < 10; i++) {
        service.completePhase('user-1', 'testuser', `fase${i}`, 10, 1);
      }
      const stats = service.getUserStats('user-1');
      expect(stats.level).toBe(1);
    });

    it('deve adicionar fase à lista de fases concluídas', () => {
      const stats = service.completePhase('user-1', 'testuser', 'fase1', 100, 60);
      expect(stats.completedPhasesList).toContain('fase1');
    });
  });

  describe('getLeaderboard', () => {
    it('deve retornar leaderboard vazio quando não há usuários', () => {
      const result = service.getLeaderboard(1, 10);
      expect(result.leaderboard).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });

    it('deve ordenar por score decrescente', () => {
      service.completePhase('u1', 'user1', 'f1', 50, 10);
      service.completePhase('u2', 'user2', 'f1', 200, 10);
      service.completePhase('u3', 'user3', 'f1', 100, 10);

      const result = service.getLeaderboard(1, 10);
      expect(result.leaderboard[0].username).toBe('user2');
      expect(result.leaderboard[1].username).toBe('user3');
      expect(result.leaderboard[2].username).toBe('user1');
    });

    it('deve aplicar paginação corretamente', () => {
      for (let i = 0; i < 5; i++) {
        service.completePhase(`u${i}`, `user${i}`, 'f1', i * 10, 1);
      }
      const page1 = service.getLeaderboard(1, 2);
      expect(page1.leaderboard).toHaveLength(2);
      expect(page1.pagination.pages).toBe(3);
    });

    it('deve incluir rank em cada entrada', () => {
      service.completePhase('u1', 'user1', 'f1', 100, 10);
      const result = service.getLeaderboard(1, 10);
      expect(result.leaderboard[0].rank).toBe(1);
    });
  });

  describe('getLeaderboardWithUserRank', () => {
    it('deve retornar top 10 e ranking do usuário', () => {
      service.completePhase('u1', 'user1', 'f1', 500, 10);
      service.completePhase('u2', 'user2', 'f1', 100, 10);

      const result = service.getLeaderboardWithUserRank('u2');
      expect(result.leaderboard).toHaveLength(2);
      expect(result.userRank).toBe(2);
      expect(result.userStats).toBeDefined();
    });

    it('deve retornar userRank null para usuário inexistente', () => {
      const result = service.getLeaderboardWithUserRank('inexistente');
      expect(result.userRank).toBeNull();
      expect(result.userStats).toBeNull();
    });
  });

  describe('getUserStats', () => {
    it('deve retornar null para userId inexistente', () => {
      expect(service.getUserStats('inexistente')).toBeNull();
    });

    it('deve retornar stats do usuário', () => {
      service.completePhase('u1', 'user1', 'f1', 100, 60);
      const stats = service.getUserStats('u1');
      expect(stats.score).toBe(100);
    });
  });
});

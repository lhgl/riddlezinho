jest.mock('../../../src/utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => next()),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const { AchievementService } = require('../../../src/services/AchievementService');
const { InMemoryAchievementRepository } = require('../../../src/repositories/InMemoryAchievementRepository');

describe('AchievementService', () => {
  let service;
  let repo;

  beforeEach(() => {
    repo = new InMemoryAchievementRepository();
    service = new AchievementService(repo);
  });

  describe('getAllAchievements', () => {
    it('deve retornar todas as conquistas disponíveis', () => {
      const all = service.getAllAchievements();
      expect(all.length).toBe(5);
      expect(all.map(a => a.key)).toEqual(['iniciante', 'aprendiz', 'veterano', 'mestre', 'lenda']);
    });
  });

  describe('checkAndGrant', () => {
    it('deve conceder conquista ao completar primeira fase', () => {
      const earned = service.checkAndGrant('user-1', 1);
      expect(earned.length).toBe(1);
      expect(earned[0].key).toBe('iniciante');
    });

    it('não deve conceder conquista se threshold não atingido', () => {
      const earned = service.checkAndGrant('user-1', 0);
      expect(earned).toHaveLength(0);
    });

    it('não deve conceder mesma conquista duas vezes', () => {
      service.checkAndGrant('user-1', 1);
      const second = service.checkAndGrant('user-1', 1);
      expect(second).toHaveLength(0);
    });

    it('deve conceder múltiplas conquistas quando vários thresholds são atingidos', () => {
      const earned = service.checkAndGrant('user-1', 10);
      expect(earned.length).toBe(2);
      expect(earned.map(a => a.key)).toEqual(expect.arrayContaining(['iniciante', 'aprendiz']));
    });

    it('deve conceder conquistas progressivamente', () => {
      service.checkAndGrant('user-1', 1);
      const second = service.checkAndGrant('user-1', 10);
      expect(second.length).toBe(1);
      expect(second[0].key).toBe('aprendiz');
    });
  });

  describe('getUserAchievements', () => {
    it('deve retornar lista vazia para usuário sem conquistas', () => {
      expect(service.getUserAchievements('nobody')).toHaveLength(0);
    });

    it('deve retornar conquistas do usuário', () => {
      service.checkAndGrant('user-1', 10);
      const achievements = service.getUserAchievements('user-1');
      expect(achievements.length).toBe(2);
    });
  });
});

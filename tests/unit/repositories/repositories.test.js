/**
 * Testes para repositórios in-memory
 */

jest.mock('../../../src/utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => next()),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const { InMemoryUserRepository } = require('../../../src/repositories/InMemoryUserRepository');
const { InMemoryLeaderboardRepository } = require('../../../src/repositories/InMemoryLeaderboardRepository');

describe('InMemoryUserRepository', () => {
  let repo;

  const buildUser = (overrides = {}) => ({
    id: 'user-1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashed',
    createdAt: new Date(),
    lastLogin: null,
    preferences: { language: 'pt-BR', notifications: true },
    ...overrides
  });

  beforeEach(() => {
    repo = new InMemoryUserRepository();
  });

  describe('save e findById', () => {
    it('deve salvar e recuperar usuário por id', () => {
      const user = buildUser();
      repo.save(user);
      expect(repo.findById('user-1')).toEqual(user);
    });

    it('deve retornar undefined para id desconhecido', () => {
      expect(repo.findById('inexistente')).toBeUndefined();
    });
  });

  describe('findByUsername', () => {
    it('deve encontrar usuário por username', () => {
      repo.save(buildUser());
      expect(repo.findByUsername('testuser')).toBeDefined();
    });

    it('deve retornar undefined para username inexistente', () => {
      expect(repo.findByUsername('nobody')).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('deve encontrar usuário por email', () => {
      repo.save(buildUser());
      expect(repo.findByEmail('test@example.com')).toBeDefined();
    });

    it('deve retornar undefined para email inexistente', () => {
      expect(repo.findByEmail('none@none.com')).toBeUndefined();
    });
  });

  describe('findByUsernameOrEmail', () => {
    it('deve encontrar por username', () => {
      repo.save(buildUser());
      expect(repo.findByUsernameOrEmail('testuser', 'other@mail.com')).toBeDefined();
    });

    it('deve encontrar por email', () => {
      repo.save(buildUser());
      expect(repo.findByUsernameOrEmail('other', 'test@example.com')).toBeDefined();
    });

    it('deve retornar undefined quando nenhum coincide', () => {
      repo.save(buildUser());
      expect(repo.findByUsernameOrEmail('other', 'other@mail.com')).toBeUndefined();
    });
  });

  describe('update', () => {
    it('deve atualizar campos do usuário', () => {
      repo.save(buildUser());
      const updated = repo.update('user-1', { lastLogin: new Date('2024-01-01') });
      expect(updated.lastLogin).toEqual(new Date('2024-01-01'));
    });

    it('deve retornar undefined para id inexistente', () => {
      expect(repo.update('inexistente', { lastLogin: new Date() })).toBeUndefined();
    });
  });
});

describe('InMemoryLeaderboardRepository', () => {
  let repo;

  const buildScore = (overrides = {}) => ({
    userId: 'user-1',
    username: 'testuser',
    score: 100,
    completedPhases: 5,
    level: 0,
    timeSpent: 300,
    lastUpdate: new Date(),
    completedPhasesList: ['fase1', 'fase2'],
    ...overrides
  });

  beforeEach(() => {
    repo = new InMemoryLeaderboardRepository();
  });

  describe('save e findByUserId', () => {
    it('deve salvar e recuperar score por userId', () => {
      const score = buildScore();
      repo.save(score);
      expect(repo.findByUserId('user-1')).toEqual(score);
    });

    it('deve retornar undefined para userId desconhecido', () => {
      expect(repo.findByUserId('inexistente')).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('deve retornar lista vazia quando nenhum score existe', () => {
      expect(repo.findAll()).toEqual([]);
    });

    it('deve retornar todos os scores salvos', () => {
      repo.save(buildScore({ userId: 'u1', username: 'user1' }));
      repo.save(buildScore({ userId: 'u2', username: 'user2' }));
      expect(repo.findAll()).toHaveLength(2);
    });
  });
});

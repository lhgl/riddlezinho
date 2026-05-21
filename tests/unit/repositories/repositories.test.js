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
    it('deve salvar e recuperar usuário por id', async () => {
      const user = buildUser();
      await repo.save(user);
      expect(await repo.findById('user-1')).toEqual(user);
    });

    it('deve retornar undefined para id desconhecido', async () => {
      expect(await repo.findById('inexistente')).toBeUndefined();
    });
  });

  describe('findByUsername', () => {
    it('deve encontrar usuário por username', async () => {
      await repo.save(buildUser());
      expect(await repo.findByUsername('testuser')).toBeDefined();
    });

    it('deve retornar undefined para username inexistente', async () => {
      expect(await repo.findByUsername('nobody')).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('deve encontrar usuário por email', async () => {
      await repo.save(buildUser());
      expect(await repo.findByEmail('test@example.com')).toBeDefined();
    });

    it('deve retornar undefined para email inexistente', async () => {
      expect(await repo.findByEmail('none@none.com')).toBeUndefined();
    });
  });

  describe('findByUsernameOrEmail', () => {
    it('deve encontrar por username', async () => {
      await repo.save(buildUser());
      expect(await repo.findByUsernameOrEmail('testuser', 'other@mail.com')).toBeDefined();
    });

    it('deve encontrar por email', async () => {
      await repo.save(buildUser());
      expect(await repo.findByUsernameOrEmail('other', 'test@example.com')).toBeDefined();
    });

    it('deve retornar undefined quando nenhum coincide', async () => {
      await repo.save(buildUser());
      expect(await repo.findByUsernameOrEmail('other', 'other@mail.com')).toBeUndefined();
    });
  });

  describe('update', () => {
    it('deve atualizar campos do usuário', async () => {
      await repo.save(buildUser());
      const updated = await repo.update('user-1', { lastLogin: new Date('2024-01-01') });
      expect(updated.lastLogin).toEqual(new Date('2024-01-01'));
    });

    it('deve retornar undefined para id inexistente', async () => {
      expect(await repo.update('inexistente', { lastLogin: new Date() })).toBeUndefined();
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
    it('deve salvar e recuperar score por userId', async () => {
      const score = buildScore();
      await repo.save(score);
      expect(await repo.findByUserId('user-1')).toEqual(score);
    });

    it('deve retornar undefined para userId desconhecido', async () => {
      expect(await repo.findByUserId('inexistente')).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('deve retornar lista vazia quando nenhum score existe', async () => {
      expect(await repo.findAll()).toEqual([]);
    });

    it('deve retornar todos os scores salvos', async () => {
      await repo.save(buildScore({ userId: 'u1', username: 'user1' }));
      await repo.save(buildScore({ userId: 'u2', username: 'user2' }));
      expect(await repo.findAll()).toHaveLength(2);
    });
  });
});

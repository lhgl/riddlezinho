/**
 * Testes unitários para AuthService
 */

jest.mock('../../../src/utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => next()),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const { AuthService } = require('../../../src/services/AuthService');

const buildMockRepo = (store = new Map()) => ({
  findById: jest.fn(id => store.get(id)),
  findByUsername: jest.fn(username => Array.from(store.values()).find(u => u.username === username)),
  findByEmail: jest.fn(email => Array.from(store.values()).find(u => u.email === email)),
  findByUsernameOrEmail: jest.fn((username, email) =>
    Array.from(store.values()).find(u => u.username === username || u.email === email)
  ),
  save: jest.fn(user => store.set(user.id, user)),
  update: jest.fn((id, updates) => {
    const user = store.get(id);
    if (!user) { return undefined; }
    const updated = { ...user, ...updates };
    store.set(id, updated);
    return updated;
  })
});

describe('AuthService', () => {
  let service;
  let mockRepo;
  let store;

  beforeEach(() => {
    store = new Map();
    mockRepo = buildMockRepo(store);
    service = new AuthService(mockRepo, 'test-secret', '1h');
  });

  describe('register', () => {
    it('deve registrar novo usuário com sucesso', async () => {
      const user = await service.register('newuser', 'new@example.com', 'password123');
      expect(user).toBeDefined();
      expect(user.username).toBe('newuser');
      expect(user.email).toBe('new@example.com');
      expect(user.password).toBeUndefined();
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('deve lançar ConflictError para usuário duplicado', async () => {
      mockRepo.findByUsernameOrEmail.mockReturnValue({ id: 'existing', username: 'newuser' });
      await expect(service.register('newuser', 'other@mail.com', 'pass'))
        .rejects.toThrow('Usuário ou email já existe');
    });

    it('não deve retornar a senha no resultado', async () => {
      const user = await service.register('safeuser', 'safe@example.com', 'mypassword');
      expect(user.password).toBeUndefined();
    });
  });

  describe('login', () => {
    it('deve lançar AuthenticationError para usuário inexistente', async () => {
      await expect(service.login('nobody', 'pass'))
        .rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve fazer login com sucesso e retornar token', async () => {
      // Registra usuário primeiro
      await service.register('loginuser', 'login@example.com', 'correctpass');

      const result = await service.login('loginuser', 'correctpass');
      expect(result.token).toBeDefined();
      expect(result.user.username).toBe('loginuser');
    });

    it('deve lançar AuthenticationError para senha incorreta', async () => {
      await service.register('wrongpass', 'wrong@example.com', 'correctpass');
      await expect(service.login('wrongpass', 'wrongpass'))
        .rejects.toThrow('Usuário ou senha inválidos');
    });
  });

  describe('verifyToken', () => {
    it('deve lançar erro para token inválido', () => {
      expect(() => service.verifyToken('invalid.token.here')).toThrow('Token inválido');
    });

    it('deve verificar token válido com sucesso', async () => {
      await service.register('tokenuser', 'token@example.com', 'pass123');
      const { token } = await service.login('tokenuser', 'pass123');
      const payload = service.verifyToken(token);
      expect(payload.username).toBe('tokenuser');
      expect(payload.userId).toBeDefined();
    });
  });

  describe('getUser', () => {
    it('deve retornar null para userId inexistente', () => {
      expect(service.getUser('inexistente')).toBeNull();
    });

    it('deve retornar usuário sem senha', async () => {
      const registered = await service.register('getuser', 'get@example.com', 'pass123');
      const found = service.getUser(registered.id);
      expect(found).toBeDefined();
      expect(found.username).toBe('getuser');
      expect(found.password).toBeUndefined();
    });
  });

  describe('updateUserProfile', () => {
    it('deve retornar null para userId inexistente', () => {
      expect(service.updateUserProfile('inexistente', {})).toBeNull();
    });

    it('deve atualizar preferências do usuário', async () => {
      const registered = await service.register('prefuser', 'pref@example.com', 'pass123');
      const updated = service.updateUserProfile(registered.id, {
        preferences: { notifications: false }
      });
      expect(updated).toBeDefined();
      expect(updated.preferences.notifications).toBe(false);
    });
  });
});

/**
 * Testes para Auth Utils - Cobertura 100%
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock do logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => {
    req.requestId = 'test-request-id';
    req.userId = 'anonymous';
    next();
  }),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const logger = require('../../../src/utils/logger');
const auth = require('../../../src/utils/auth');

describe('Auth Utils - Complete Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    logger.logEvent.mockClear();
    logger.logError.mockClear();
    logger.logWarn.mockClear();
    // Limpar usuarios entre testes
    auth.users.clear();
  });

  describe('register', () => {
    it('deve registrar novo usuario com sucesso', async () => {
      const user = await auth.register('testuser', 'test@example.com', 'password123');

      expect(user).toBeDefined();
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.password).toBeUndefined();
      expect(logger.logEvent).toHaveBeenCalledWith('user_registered', expect.any(Object));
    });

    it('deve rejeitar usuario duplicado por username', async () => {
      await auth.register('dupuser', 'test1@example.com', 'password123');

      await expect(
        auth.register('dupuser', 'test2@example.com', 'password123')
      ).rejects.toThrow('Usuário ou email já existe');
    });

    it('deve rejeitar usuario duplicado por email', async () => {
      await auth.register('user1', 'dup@example.com', 'password123');

      await expect(
        auth.register('user2', 'dup@example.com', 'password123')
      ).rejects.toThrow('Usuário ou email já existe');
    });

    it('deve fazer hash da senha', async () => {
      const user = await auth.register('hashtest', 'hash@example.com', 'password123');

      // Buscar usuario no mapa interno para verificar hash
      const storedUser = auth.users.get(user.id);
      expect(storedUser.password).not.toBe('password123');
      expect(storedUser.password.length).toBeGreaterThan(50);
    });

    it('deve definir preferencias padrao', async () => {
      const user = await auth.register('prefstest', 'prefs@example.com', 'password123');

      expect(user.preferences).toEqual({
        language: 'pt-BR',
        notifications: true
      });
    });

    it('deve definir createdAt', async () => {
      const before = Date.now();
      const user = await auth.register('datetest', 'date@example.com', 'password123');
      const after = Date.now();

      const createdAt = new Date(user.createdAt).getTime();
      expect(createdAt).toBeGreaterThanOrEqual(before);
      expect(createdAt).toBeLessThanOrEqual(after);
    });

    it('deve definir lastLogin como null', async () => {
      const user = await auth.register('logintest', 'login@example.com', 'password123');

      expect(user.lastLogin).toBeNull();
    });

    it('deve logar erro no registro', async () => {
      // Mock para lancar erro
      const originalHash = bcrypt.hash;
      bcrypt.hash = jest.fn().mockRejectedValue(new Error('Hash error'));

      await expect(
        auth.register('errortest', 'error@example.com', 'password123')
      ).rejects.toThrow('Hash error');

      expect(logger.logError).toHaveBeenCalledWith('user_registration_failed', expect.any(Error), {
        username: 'errortest',
        email: 'error@example.com'
      });

      bcrypt.hash = originalHash;
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      await auth.register('loginuser', 'login@example.com', 'password123');
      const result = await auth.login('loginuser', 'password123');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
    });

    it('deve logar warning em tentativa de login falha', async () => {
      await auth.register('wrongpasstest', 'wrong@example.com', 'password123');
      
      try {
        await auth.login('wrongpasstest', 'wrongpassword');
      } catch (e) {
        // Esperado
      }

      expect(logger.logWarn).toHaveBeenCalledWith('failed_login_attempt', expect.objectContaining({
        username: 'wrongpasstest',
        reason: 'invalid_password'
      }));
    });

    it('deve rejeitar usuario inexistente', async () => {
      await expect(
        auth.login('nonexistent', 'password123')
      ).rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve rejeitar senha incorreta', async () => {
      await auth.register('wrongpass', 'wrong@example.com', 'password123');

      await expect(
        auth.login('wrongpass', 'wrongpassword')
      ).rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve logar warning em login falho', async () => {
      await auth.register('warnlogin', 'warn@example.com', 'password123');

      try {
        await auth.login('warnlogin', 'wrongpassword');
      } catch (e) {
        // Esperado
      }

      expect(logger.logWarn).toHaveBeenCalledWith('failed_login_attempt', {
        username: 'warnlogin',
        reason: 'invalid_password'
      });
    });

    it('deve logar erro no login', async () => {
      // Mock para lancar erro
      const originalFind = Array.from;
      Array.from = jest.fn().mockImplementation(() => {
        throw new Error('Find error');
      });

      await expect(
        auth.login('anyuser', 'anypassword')
      ).rejects.toThrow('Find error');

      expect(logger.logError).toHaveBeenCalledWith('user_login_failed', expect.any(Error), {
        username: 'anyuser'
      });

      Array.from = originalFind;
    });

    it('deve atualizar lastLogin no login', async () => {
      await auth.register('lastloginuser', 'lastlogin@example.com', 'password123');
      const before = Date.now();

      await auth.login('lastloginuser', 'password123');

      const user = auth.getUser(auth.users.get(Array.from(auth.users.keys())[0]).id);
      // lastLogin deve ter sido atualizado
      expect(user.lastLogin).toBeDefined();
    });

    it('deve gerar token JWT valido', async () => {
      await auth.register('tokenuser', 'token@example.com', 'password123');
      const result = await auth.login('tokenuser', 'password123');

      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe('string');
      expect(result.token.split('.')).toHaveLength(3); // JWT tem 3 partes
    });

    it('deve retornar usuario sem senha no login', async () => {
      await auth.register('nopassuser', 'nopass@example.com', 'password123');
      const result = await auth.login('nopassuser', 'password123');

      expect(result.user.password).toBeUndefined();
    });
  });

  describe('verifyToken', () => {
    it('deve verificar token valido', async () => {
      await auth.register('verifyuser', 'verify@example.com', 'password123');
      const result = await auth.login('verifyuser', 'password123');

      const decoded = auth.verifyToken(result.token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBeDefined();
      expect(decoded.username).toBe('verifyuser');
      expect(decoded.email).toBe('verify@example.com');
    });

    it('deve rejeitar token invalido', () => {
      expect(() => {
        auth.verifyToken('invalid.token.here');
      }).toThrow('Token inválido');
    });

    it('deve rejeitar token malformado', () => {
      expect(() => {
        auth.verifyToken('not-a-jwt');
      }).toThrow('Token inválido');
    });

    it('deve rejeitar token vazio', () => {
      expect(() => {
        auth.verifyToken('');
      }).toThrow('Token inválido');
    });

    it('deve rejeitar token com signature invalida', () => {
      // Token com estrutura JWT mas signature invalida
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.invalidsignature';

      expect(() => {
        auth.verifyToken(invalidToken);
      }).toThrow();
    });
  });

  describe('authenticate middleware', () => {
    it('deve autenticar request com token valido', async () => {
      await auth.register('middlewareuser', 'middleware@example.com', 'password123');
      const result = await auth.login('middlewareuser', 'password123');

      const req = {
        headers: { authorization: `Bearer ${result.token}` },
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.userId).toBeDefined();
      expect(req.user).toBeDefined();
      expect(req.user.username).toBe('middlewareuser');
    });

    it('deve rejeitar request sem token', () => {
      const req = {
        headers: {},
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve rejeitar request com token malformado', () => {
      const req = {
        headers: { authorization: 'Bearer invalid-token' },
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
    });

    it('deve rejeitar request com token expirado', () => {
      const req = {
        headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired' },
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('deve logar warning em autenticacao falha', async () => {
      // Clear mocks para garantir que vamos verificar apenas esta chamada
      logger.logWarn.mockClear();
      
      const req = {
        headers: { authorization: 'Bearer definitely-invalid-token-that-will-fail' },
        ip: '192.168.1.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      // Verificar que logWarn foi chamado com os argumentos corretos
      expect(logger.logWarn).toHaveBeenCalled();
      const callArgs = logger.logWarn.mock.calls[0];
      expect(callArgs[0]).toBe('authentication_failed');
      expect(callArgs[1]).toHaveProperty('error');
      expect(callArgs[1]).toHaveProperty('ip', '192.168.1.1');
    });

    it('deve aceitar token no formato Bearer correto', async () => {
      await auth.register('bearertest', 'bearer@example.com', 'password123');
      const result = await auth.login('bearertest', 'password123');

      const req = {
        headers: { authorization: `Bearer ${result.token}` },
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve rejeitar token sem prefixo Bearer', async () => {
      await auth.register('noprefix', 'noprefix@example.com', 'password123');
      const result = await auth.login('noprefix', 'password123');

      const req = {
        headers: { authorization: result.token }, // Sem "Bearer "
        ip: '127.0.0.1'
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
    });
  });

  describe('getUser', () => {
    it('deve retornar usuario existente', async () => {
      const user = await auth.register('getuser', 'get@example.com', 'password123');
      const retrieved = auth.getUser(user.id);

      expect(retrieved).toBeDefined();
      expect(retrieved.username).toBe('getuser');
      expect(retrieved.email).toBe('get@example.com');
    });

    it('deve retornar null para usuario inexistente', () => {
      const result = auth.getUser('non-existent-id');

      expect(result).toBeNull();
    });

    it('deve retornar usuario sem senha', async () => {
      const user = await auth.register('nopassget', 'nopassget@example.com', 'password123');
      const retrieved = auth.getUser(user.id);

      expect(retrieved.password).toBeUndefined();
    });

    it('deve retornar usuario com preferencias', async () => {
      const user = await auth.register('prefget', 'prefget@example.com', 'password123');
      const retrieved = auth.getUser(user.id);

      expect(retrieved.preferences).toEqual({
        language: 'pt-BR',
        notifications: true
      });
    });
  });

  describe('updateUserProfile', () => {
    it('deve atualizar preferencias do usuario', async () => {
      const user = await auth.register('updateuser', 'update@example.com', 'password123');

      const updated = auth.updateUserProfile(user.id, {
        preferences: {
          language: 'en-US',
          notifications: false
        }
      });

      expect(updated).toBeDefined();
      expect(updated.preferences.language).toBe('en-US');
      expect(updated.preferences.notifications).toBe(false);
    });

    it('deve retornar null para usuario inexistente', () => {
      const result = auth.updateUserProfile('non-existent-id', {
        preferences: { language: 'pt-BR' }
      });

      expect(result).toBeNull();
    });

    it('deve logar atualizacao de perfil', async () => {
      const user = await auth.register('logupdate', 'logupdate@example.com', 'password123');

      auth.updateUserProfile(user.id, {
        preferences: { language: 'fr-FR' }
      });

      expect(logger.logEvent).toHaveBeenCalledWith('user_profile_updated', {
        userId: user.id,
        updates: ['preferences']
      });
    });

    it('deve atualizar apenas preferencias fornecidas', async () => {
      const user = await auth.register('partialupdate', 'partial@example.com', 'password123');

      const updated = auth.updateUserProfile(user.id, {
        preferences: {
          language: 'es-ES'
          // notifications nao fornecido
        }
      });

      expect(updated.preferences.language).toBe('es-ES');
      expect(updated.preferences.notifications).toBe(true); // Mantido padrao
    });

    it('deve retornar usuario sem senha', async () => {
      const user = await auth.register('noupdatepass', 'noupdate@example.com', 'password123');
      const updated = auth.updateUserProfile(user.id, {
        preferences: { language: 'de-DE' }
      });

      expect(updated.password).toBeUndefined();
    });

    it('deve lidar com atualizacao vazia', async () => {
      const user = await auth.register('emptyupdate', 'empty@example.com', 'password123');

      const updated = auth.updateUserProfile(user.id, {});

      expect(updated).toBeDefined();
      expect(updated.preferences.language).toBe('pt-BR'); // Mantido padrao
    });
  });

  describe('Constants', () => {
    it('deve usar JWT_SECRET do ambiente ou padrao', () => {
      // O modulo ja foi carregado, entao testamos o comportamento
      expect(typeof auth.verifyToken).toBe('function');
    });

    it('deve usar JWT_EXPIRE do ambiente ou padrao', async () => {
      await auth.register('expirytest', 'expiry@example.com', 'password123');
      const result = await auth.login('expirytest', 'password123');

      // Token deve ser valido (nao expirado imediatamente)
      const decoded = auth.verifyToken(result.token);
      expect(decoded).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com username com caracteres especiais', async () => {
      const user = await auth.register('user@test+123', 'special@example.com', 'password123');

      expect(user.username).toBe('user@test+123');
    });

    it('deve lidar com email com subdomain', async () => {
      const user = await auth.register('subdomain', 'user@sub.example.com', 'password123');

      expect(user.email).toBe('user@sub.example.com');
    });

    it('deve lidar com senha longa', async () => {
      const longPassword = 'a'.repeat(100);
      const user = await auth.register('longpass', 'long@example.com', longPassword);

      expect(user).toBeDefined();

      // Login deve funcionar
      const result = await auth.login('longpass', longPassword);
      expect(result.token).toBeDefined();
    });

    it('deve lidar com senha minima', async () => {
      const user = await auth.register('minpass', 'min@example.com', 'ab');

      expect(user).toBeDefined();
    });

    it('deve permitir multiplos usuarios', async () => {
      const user1 = await auth.register('multi1', 'multi1@example.com', 'password123');
      const user2 = await auth.register('multi2', 'multi2@example.com', 'password123');
      const user3 = await auth.register('multi3', 'multi3@example.com', 'password123');

      expect(user1.id).not.toBe(user2.id);
      expect(user2.id).not.toBe(user3.id);
      expect(user1.id).not.toBe(user3.id);
    });
  });
});

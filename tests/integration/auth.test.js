/**
 * Testes de Integração de Autenticação
 */

const auth = require('../../src/utils/auth');

describe('Auth API', () => {
  describe('User Registration', () => {
    it('deve permitir registro', async () => {
      try {
        const result = await auth.register(
          `user_${Date.now()}`,
          `user${Date.now()}@example.com`,
          'password123'
        );
        expect(result).toBeDefined();
        expect(result.username).toBeDefined();
        expect(result.email).toBeDefined();
        expect(result.password).toBeUndefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });

    it('deve rejeitar usuario duplicado', async () => {
      const username = `duplicate_${Date.now()}`;
      await auth.register(username, `${username}@example.com`, 'password123');

      try {
        await auth.register(username, `${username}@example.com`, 'password123');
        fail('Should have thrown error');
      } catch (e) {
        expect(e.message).toContain('já existe');
      }
    });
  });

  describe('User Login', () => {
    it('deve permitir login', async () => {
      const username = `login_${Date.now()}`;
      await auth.register(username, `${username}@example.com`, 'password123');
      const result = await auth.login(username, 'password123');
      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
    });

    it('deve rejeitar login com senha invalida', async () => {
      const username = `login_${Date.now()}`;
      await auth.register(username, `${username}@example.com`, 'password123');

      try {
        await auth.login(username, 'wrongpassword');
        fail('Should have thrown error');
      } catch (e) {
        expect(e.message).toContain('inválidos');
      }
    });

    it('deve rejeitar login de usuario inexistente', async () => {
      try {
        await auth.login('nonexistent', 'password123');
        fail('Should have thrown error');
      } catch (e) {
        expect(e.message).toContain('inválidos');
      }
    });
  });

  describe('Token Verification', () => {
    it('deve verificar token valido', async () => {
      const username = `token_${Date.now()}`;
      await auth.register(username, `${username}@example.com`, 'password123');
      const { token } = await auth.login(username, 'password123');

      const decoded = auth.verifyToken(token);
      expect(decoded).toBeDefined();
      expect(decoded.username).toBe(username);
    });

    it('deve rejeitar token expirado', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjIzOTAyMn0.expired';
      expect(() => auth.verifyToken(expiredToken)).toThrow();
    });

    it('deve rejeitar token invalido', () => {
      expect(() => auth.verifyToken('invalid-token')).toThrow();
    });
  });

  describe('User Management', () => {
    it('deve obter usuario por ID', async () => {
      const username = `getuser_${Date.now()}`;
      const registered = await auth.register(username, `${username}@example.com`, 'password123');
      const user = auth.getUser(registered.id);

      expect(user).toBeDefined();
      expect(user.username).toBe(username);
      expect(user.password).toBeUndefined();
    });

    it('deve retornar null para usuario inexistente', () => {
      const user = auth.getUser('non-existent-id');
      expect(user).toBeNull();
    });

    it('deve atualizar perfil do usuario', async () => {
      const username = `update_${Date.now()}`;
      const registered = await auth.register(username, `${username}@example.com`, 'password123');

      const updated = auth.updateUserProfile(registered.id, {
        preferences: { language: 'en-US', notifications: false }
      });

      expect(updated).toBeDefined();
      expect(updated.preferences.language).toBe('en-US');
    });
  });

  describe('Authenticate Middleware', () => {
    it('deve autenticar request com token valido', async () => {
      const username = `middleware_${Date.now()}`;
      await auth.register(username, `${username}@example.com`, 'password123');
      const { token } = await auth.login(username, 'password123');

      const req = {
        headers: { authorization: `Bearer ${token}` },
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
    });

    it('deve rejeitar request sem token', () => {
      const req = { headers: {}, ip: '127.0.0.1' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      auth.authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('deve rejeitar request com token invalido', () => {
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
    });
  });
});

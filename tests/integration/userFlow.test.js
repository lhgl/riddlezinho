/**
 * Testes de Integração - Fluxo Completo do Usuário
 * Coverage: Testes de integração para API completa
 */

const auth = require('../../src/utils/auth');
const PhaseControllerModule = require('../../src/controllers/PhaseController');
const PhaseController = PhaseControllerModule.PhaseControllerClass || PhaseControllerModule.default || PhaseControllerModule;

// Mock do logger
jest.mock('../../src/utils/logger', () => ({
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

describe('Integration Tests - Complete User Flow', () => {
  const phases = {
    fasezero: { id: 'fasezero', number: 0, level: 0, name: 'Fase Zero', type: 'passcode' },
    coracao: { id: 'coracao', number: 1, level: 1, name: 'Fase 1', type: 'passcode', image: '/test.jpg' }
  };
  const footerPasscode = '<footer>Passcode</footer>';
  const footerBack = '<footer>Back</footer>';

  beforeEach(() => {
    // Limpar dados de autenticação
    auth.users.clear();
    jest.clearAllMocks();
  });

  describe('Auth Integration', () => {
    it('deve permitir registro de usuario', async () => {
      const user = await auth.register(
        `test_${Date.now()}`,
        `test${Date.now()}@example.com`,
        'password123'
      );
      expect(user).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.password).toBeUndefined();
    });

    it('deve fazer login apos registro', async () => {
      const username = `logintest_${Date.now()}`;
      const email = `${username}@example.com`;
      const password = 'password123';

      await auth.register(username, email, password);
      const result = await auth.login(username, password);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.username).toBe(username);
    });

    it('deve rejeitar login com senha errada', async () => {
      const username = `wrongpass_${Date.now()}`;
      const email = `${username}@example.com`;
      const password = 'password123';

      await auth.register(username, email, password);

      await expect(auth.login(username, 'wrongpassword')).rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve rejeitar login de usuario inexistente', async () => {
      await expect(auth.login('nonexistent', 'password123')).rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve verificar token valido', async () => {
      const username = `token_${Date.now()}`;
      const email = `${username}@example.com`;
      const password = 'password123';

      await auth.register(username, email, password);
      const result = await auth.login(username, password);
      const decoded = auth.verifyToken(result.token);

      expect(decoded).toBeDefined();
      expect(decoded.username).toBe(username);
    });

    it('deve rejeitar token invalido', () => {
      expect(() => auth.verifyToken('invalid-token')).toThrow('Token inválido');
    });

    it('deve obter usuario por ID', async () => {
      const username = `getuser_${Date.now()}`;
      const email = `${username}@example.com`;
      const password = 'password123';

      const registered = await auth.register(username, email, password);
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
      const email = `${username}@example.com`;
      const password = 'password123';

      const registered = await auth.register(username, email, password);
      const updated = auth.updateUserProfile(registered.id, {
        preferences: { language: 'en-US', notifications: false }
      });

      expect(updated).toBeDefined();
      expect(updated.preferences.language).toBe('en-US');
      expect(updated.preferences.notifications).toBe(false);
    });
  });

  describe('PhaseController Integration', () => {
    let phaseController, mockReq, mockRes, next;

    beforeEach(() => {
      phaseController = new PhaseController(phases, footerPasscode, footerBack);
      mockReq = { params: {} };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        render: jest.fn()
      };
      next = jest.fn();
    });

    it('deve renderizar fase existente', () => {
      const fs = require('fs');
      const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      mockReq.params.phaseId = 'fasezero';
      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.render).toHaveBeenCalledWith('fasezero', expect.objectContaining({
        phase: phases.fasezero
      }));

      existsSyncSpy.mockRestore();
    });

    it('deve retornar 404 para fase inexistente', () => {
      mockReq.params.phaseId = 'nonexistent';
      phaseController.renderPhase(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.render).toHaveBeenCalledWith('error', expect.any(Object));
    });

    it('deve renderizar index', () => {
      phaseController.renderIndex(mockReq, mockRes);
      expect(mockRes.render).toHaveBeenCalledWith('index');
    });

    it('deve renderizar jogar', () => {
      phaseController.renderGame(mockReq, mockRes);
      expect(mockRes.render).toHaveBeenCalledWith('jogar');
    });

    it('deve retornar lista de fases em JSON', () => {
      phaseController.getPhasesList(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        total: 2,
        phases: expect.arrayContaining([
          expect.objectContaining({ id: 'fasezero' }),
          expect.objectContaining({ id: 'coracao' })
        ])
      });
    });

    it('deve retornar dados de uma fase', () => {
      mockReq.params.phaseId = 'coracao';
      phaseController.getPhaseData(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(phases.coracao);
    });

    it('deve retornar 404 para fase inexistente em getPhaseData', () => {
      mockReq.params.phaseId = 'nonexistent';
      phaseController.getPhaseData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Fase não encontrada' });
    });
  });

  describe('Complete User Flow - Auth Controller', () => {
    let AuthController, mockReq, mockRes;

    beforeEach(() => {
      jest.clearAllMocks();
      const AuthControllerModule = require('../../src/controllers/AuthController');
      AuthController = AuthControllerModule.default || AuthControllerModule;
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
    });

    it('deve completar fluxo: registro -> login -> completar fase', async () => {
      // 1. Registro
      mockReq = {
        body: {
          username: `flow_${Date.now()}`,
          email: `flow${Date.now()}@example.com`,
          password: 'password123',
          passwordConfirm: 'password123'
        }
      };

      await AuthController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);

      // 2. Login
      const loginResult = await auth.login(mockReq.body.username, mockReq.body.password);
      expect(loginResult.token).toBeDefined();

      // 3. Completar fase
      mockReq = {
        userId: loginResult.user.id,
        body: {
          phaseId: 'fasezero',
          timeSpent: 60,
          score: 100
        }
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      await AuthController.completePhase(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[mockRes.json.mock.calls.length - 1][0];
      expect(response.stats).toBeDefined();
      expect(response.stats.score).toBe(100);
    });

    it('deve acessar leaderboard', async () => {
      mockReq = { query: { limit: '10', page: '1' } };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      await AuthController.getLeaderboard(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[0][0];
      expect(response).toHaveProperty('leaderboard');
      expect(response).toHaveProperty('pagination');
    });

    it('deve acessar leaderboard com rank do usuario', async () => {
      const username = `leaderboard_${Date.now()}`;
      const email = `${username}@example.com`;
      const password = 'password123';

      await auth.register(username, email, password);
      const loginResult = await auth.login(username, password);

      mockReq = {
        userId: loginResult.user.id,
        query: {}
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      if (AuthController.getLeaderboardWithUserRank) {
        await AuthController.getLeaderboardWithUserRank(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalled();
        const response = mockRes.json.mock.calls[0][0];
        expect(response).toHaveProperty('leaderboard');
        expect(response).toHaveProperty('userRank');
        expect(response).toHaveProperty('userStats');
      }
    });
  });
});

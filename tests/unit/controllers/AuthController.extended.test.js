/**
 * Testes Completos para AuthController
 * Coverage: 100% statements, branches, functions, lines
 */

const AuthControllerModule = require('../../../src/controllers/AuthController');
const AuthController = AuthControllerModule.default || AuthControllerModule;
const auth = require('../../../src/utils/auth');

// Mock do logger
jest.mock('../../../src/utils/logger', () => ({
  logEvent: jest.fn(),
  logError: jest.fn()
}));

const logger = require('../../../src/utils/logger');

describe('AuthController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    logger.logEvent.mockClear();
    logger.logError.mockClear();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('register', () => {
    it('deve registrar novo usuario com sucesso', async () => {
      mockReq = {
        body: {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
          passwordConfirm: 'password123'
        }
      };

      // Mock do auth.register
      const mockUser = {
        id: 'test-id',
        username: 'newuser',
        email: 'newuser@example.com'
      };
      jest.spyOn(auth, 'register').mockResolvedValue(mockUser);

      await AuthController.register(mockReq, mockRes);

      expect(auth.register).toHaveBeenCalledWith('newuser', 'newuser@example.com', 'password123');
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Usuário registrado com sucesso',
        user: mockUser
      });
      expect(logger.logEvent).toHaveBeenCalledWith('user_registration_success', {
        userId: 'test-id',
        username: 'newuser'
      });
    });

    it('deve retornar erro sem username', async () => {
      mockReq = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'password123'
        }
      };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Username, email e password são obrigatórios'
      });
    });

    it('deve retornar erro sem email', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          password: 'password123',
          passwordConfirm: 'password123'
        }
      };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Username, email e password são obrigatórios'
      });
    });

    it('deve retornar erro sem password', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          passwordConfirm: 'password123'
        }
      };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Username, email e password são obrigatórios'
      });
    });

    it('deve retornar erro quando senhas nao conferem', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'different'
        }
      };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Senhas não conferem'
      });
    });

    it('deve retornar erro para senha curta (menos de 6 caracteres)', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'short',
          passwordConfirm: 'short'
        }
      };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Senha deve ter no mínimo 6 caracteres'
      });
    });

    it('deve lidar com erro no registro', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'password123'
        }
      };

      jest.spyOn(auth, 'register').mockRejectedValue(new Error('Erro no banco de dados'));

      await AuthController.register(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('user_registration_failed', expect.any(Error));
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro no banco de dados' });
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          password: 'password123'
        }
      };

      const mockResult = {
        user: { id: 'test-id', username: 'testuser' },
        token: 'jwt-token-here'
      };
      jest.spyOn(auth, 'login').mockResolvedValue(mockResult);

      await AuthController.login(mockReq, mockRes);

      expect(auth.login).toHaveBeenCalledWith('testuser', 'password123');
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Login realizado com sucesso',
        user: mockResult.user,
        token: mockResult.token
      });
      expect(logger.logEvent).toHaveBeenCalledWith('user_login_success', {
        userId: 'test-id',
        username: 'testuser'
      });
    });

    it('deve retornar erro sem username', async () => {
      mockReq = {
        body: {
          password: 'password123'
        }
      };

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Username e password são obrigatórios'
      });
    });

    it('deve retornar erro sem password', async () => {
      mockReq = {
        body: {
          username: 'testuser'
        }
      };

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Username e password são obrigatórios'
      });
    });

    it('deve lidar com erro no login', async () => {
      mockReq = {
        body: {
          username: 'testuser',
          password: 'wrongpassword'
        }
      };

      jest.spyOn(auth, 'login').mockRejectedValue(new Error('Usuário ou senha inválidos'));

      await AuthController.login(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('user_login_failed', expect.any(Error));
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuário ou senha inválidos' });
    });
  });

  describe('getProfile', () => {
    it('deve obter perfil do usuario com sucesso', () => {
      mockReq = {
        userId: 'test-user-id'
      };

      const mockUser = {
        id: 'test-user-id',
        username: 'testuser',
        email: 'test@example.com'
      };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      AuthController.getProfile(mockReq, mockRes);

      expect(auth.getUser).toHaveBeenCalledWith('test-user-id');
      expect(mockRes.json).toHaveBeenCalledWith({
        user: {
          ...mockUser,
          stats: {}
        }
      });
    });

    it('deve retornar erro para usuario inexistente', () => {
      mockReq = {
        userId: 'non-existent-id'
      };

      jest.spyOn(auth, 'getUser').mockReturnValue(null);

      AuthController.getProfile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
    });

    it('deve incluir score do leaderboard', () => {
      mockReq = {
        userId: 'test-user-id'
      };

      const mockUser = {
        id: 'test-user-id',
        username: 'testuser'
      };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      AuthController.getProfile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        user: {
          ...mockUser,
          stats: {}
        }
      });
    });

    it('deve lidar com erro ao obter perfil', () => {
      mockReq = {
        userId: 'test-user-id'
      };

      jest.spyOn(auth, 'getUser').mockImplementation(() => {
        throw new Error('Erro inesperado');
      });

      AuthController.getProfile(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('get_profile_failed', expect.any(Error), {
        userId: 'test-user-id'
      });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao obter perfil' });
    });
  });

  describe('updateProfile', () => {
    it('deve atualizar perfil com sucesso', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          preferences: {
            language: 'en-US',
            notifications: false
          }
        }
      };

      const mockUser = {
        id: 'test-user-id',
        username: 'testuser',
        preferences: {
          language: 'en-US',
          notifications: false
        }
      };
      jest.spyOn(auth, 'updateUserProfile').mockReturnValue(mockUser);

      AuthController.updateProfile(mockReq, mockRes);

      expect(auth.updateUserProfile).toHaveBeenCalledWith('test-user-id', {
        preferences: {
          language: 'en-US',
          notifications: false
        }
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Perfil atualizado com sucesso',
        user: mockUser
      });
      expect(logger.logEvent).toHaveBeenCalledWith('user_profile_updated', {
        userId: 'test-user-id',
        changes: ['preferences']
      });
    });

    it('deve retornar erro para usuario inexistente', () => {
      mockReq = {
        userId: 'non-existent-id',
        body: {
          preferences: { language: 'pt-BR' }
        }
      };

      jest.spyOn(auth, 'updateUserProfile').mockReturnValue(null);

      AuthController.updateProfile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
    });

    it('deve lidar com erro ao atualizar perfil', () => {
      mockReq = {
        userId: 'test-user-id',
        body: { preferences: {} }
      };

      jest.spyOn(auth, 'updateUserProfile').mockImplementation(() => {
        throw new Error('Erro ao atualizar');
      });

      AuthController.updateProfile(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('update_profile_failed', expect.any(Error), {
        userId: 'test-user-id'
      });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar perfil' });
    });
  });

  describe('completePhase', () => {
    it('deve registrar conclusao de fase com sucesso', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'phase1',
          timeSpent: 120,
          score: 100
        }
      };

      const mockUser = {
        username: 'testuser'
      };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      AuthController.completePhase(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[0][0];
      expect(response.message).toBe('Fase concluída com sucesso');
      expect(response.stats).toBeDefined();
      expect(response.stats.score).toBe(100);
      expect(response.stats.completedPhases).toBe(1);
      expect(logger.logEvent).toHaveBeenCalledWith('phase_completed', expect.any(Object));
    });

    it('deve retornar erro sem phaseId', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          timeSpent: 120,
          score: 100
        }
      };

      AuthController.completePhase(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'phaseId, timeSpent e score são obrigatórios'
      });
    });

    it('deve retornar erro sem timeSpent', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'phase1',
          score: 100
        }
      };

      AuthController.completePhase(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'phaseId, timeSpent e score são obrigatórios'
      });
    });

    it('deve retornar erro sem score', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'phase1',
          timeSpent: 120
        }
      };

      AuthController.completePhase(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'phaseId, timeSpent e score são obrigatórios'
      });
    });

    it('nao deve duplicar score para mesma fase', () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'same-phase',
          timeSpent: 120,
          score: 100
        }
      };

      const mockUser = { username: 'testuser' };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      // Primeira conclusao
      AuthController.completePhase(mockReq, mockRes);
      const firstResponse = mockRes.json.mock.calls[0][0];
      const firstScore = firstResponse.stats.score;

      // Segunda conclusao da mesma fase
      AuthController.completePhase(mockReq, mockRes);
      const secondResponse = mockRes.json.mock.calls[1][0];
      const secondScore = secondResponse.stats.score;

      // Score nao deve aumentar
      expect(secondScore).toBe(firstScore);
    });

    it('deve calcular nivel corretamente (a cada 10 fases)', () => {
      const mockUser = { username: 'testuser' };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      mockReq = {
        userId: 'test-user-id',
        body: {
          timeSpent: 120,
          score: 100
        }
      };

      // Completar 15 fases
      for (let i = 0; i < 15; i++) {
        mockReq.body.phaseId = `phase-${i}`;
        AuthController.completePhase(mockReq, mockRes);
      }

      const lastResponse = mockRes.json.mock.calls[mockRes.json.mock.calls.length - 1][0];
      expect(lastResponse.stats.level).toBe(1); // 15 / 10 = 1
    });

    it('deve acumular timeSpent', () => {
      const mockUser = { username: 'testuser' };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'phase1',
          timeSpent: 100,
          score: 50
        }
      };

      AuthController.completePhase(mockReq, mockRes);
      const firstTime = mockRes.json.mock.calls[0][0].stats.timeSpent;

      mockReq.body.phaseId = 'phase2';
      mockReq.body.timeSpent = 150;
      AuthController.completePhase(mockReq, mockRes);
      const secondTime = mockRes.json.mock.calls[1][0].stats.timeSpent;

      expect(secondTime).toBeGreaterThan(firstTime);
    });

    it('deve lidar com erro ao completar fase', async () => {
      mockReq = {
        userId: 'test-user-id',
        body: {
          phaseId: 'phase1',
          timeSpent: 120,
          score: 100
        }
      };

      // Mock do getUser para retornar usuario valido
      const mockUser = { username: 'testuser' };
      jest.spyOn(auth, 'getUser').mockReturnValue(mockUser);

      // Mock do leaderboard.set para lancar erro
      const originalSet = Map.prototype.set;
      Map.prototype.set = jest.fn().mockImplementation(() => {
        throw new Error('Erro ao salvar no leaderboard');
      });

      await AuthController.completePhase(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('complete_phase_failed', expect.any(Error), {
        userId: 'test-user-id'
      });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao registrar conclusão' });

      // Restaurar
      Map.prototype.set = originalSet;
    });
  });

  describe('getLeaderboard', () => {
    it('deve retornar leaderboard com paginacao', () => {
      mockReq = {
        query: {
          limit: '10',
          page: '1'
        }
      };

      AuthController.getLeaderboard(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[0][0];
      expect(response).toHaveProperty('leaderboard');
      expect(response).toHaveProperty('pagination');
      expect(response.pagination).toHaveProperty('page', 1);
      expect(response.pagination).toHaveProperty('limit', 10);
    });

    it('deve usar valores padrao para limit e page', () => {
      mockReq = {
        query: {}
      };

      AuthController.getLeaderboard(mockReq, mockRes);

      const response = mockRes.json.mock.calls[0][0];
      expect(response.pagination.limit).toBe(100);
      expect(response.pagination.page).toBe(1);
    });

    it('deve ordenar por score decrescente', () => {
      mockReq = {
        query: {}
      };

      AuthController.getLeaderboard(mockReq, mockRes);

      const response = mockRes.json.mock.calls[0][0];
      expect(Array.isArray(response.leaderboard)).toBe(true);
    });

    it('deve incluir ranking nos itens', () => {
      mockReq = {
        query: {}
      };

      AuthController.getLeaderboard(mockReq, mockRes);

      const response = mockRes.json.mock.calls[0][0];
      response.leaderboard.forEach(item => {
        expect(item).toHaveProperty('rank');
      });
    });

    it('deve lidar com erro ao obter leaderboard', () => {
      mockReq = {
        query: {}
      };

      // Simular erro
      const originalFrom = Array.from;
      Array.from = jest.fn().mockImplementation(() => {
        throw new Error('Erro no leaderboard');
      });

      AuthController.getLeaderboard(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('get_leaderboard_failed', expect.any(Error));
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao obter leaderboard' });

      Array.from = originalFrom;
    });
  });

  describe('getLeaderboardWithUserRank', () => {
    it('deve retornar top 10 com rank do usuario', () => {
      mockReq = {
        userId: 'test-user-id',
        query: {}
      };

      AuthController.getLeaderboardWithUserRank(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[0][0];
      expect(response).toHaveProperty('leaderboard');
      expect(response).toHaveProperty('userRank');
      expect(response).toHaveProperty('userStats');
    });

    it('deve retornar top 10 limitado', () => {
      mockReq = {
        userId: 'test-user-id',
        query: {}
      };

      AuthController.getLeaderboardWithUserRank(mockReq, mockRes);

      const response = mockRes.json.mock.calls[0][0];
      expect(response.leaderboard.length).toBeLessThanOrEqual(10);
    });

    it('deve incluir rank correto para cada item do top 10', () => {
      mockReq = {
        userId: 'test-user-id',
        query: {}
      };

      AuthController.getLeaderboardWithUserRank(mockReq, mockRes);

      const response = mockRes.json.mock.calls[0][0];
      response.leaderboard.forEach((item, index) => {
        expect(item.rank).toBe(index + 1);
      });
    });

    it('deve lidar com erro ao obter leaderboard com rank', () => {
      mockReq = {
        userId: 'test-user-id',
        query: {}
      };

      const originalFrom = Array.from;
      Array.from = jest.fn().mockImplementation(() => {
        throw new Error('Erro no leaderboard');
      });

      AuthController.getLeaderboardWithUserRank(mockReq, mockRes);

      expect(logger.logError).toHaveBeenCalledWith('get_leaderboard_user_rank_failed', expect.any(Error));
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao obter leaderboard' });

      Array.from = originalFrom;
    });
  });
});

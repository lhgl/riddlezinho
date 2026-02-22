/**
 * Testes para Auth Router - Cobertura 100%
 * Testa configuracao e execucao dos handlers
 */

const createAuthRouterModule = require('../../../src/routes/auth');
const createAuthRouter = createAuthRouterModule.default || createAuthRouterModule;

// Mock dos middlewares APENAS
jest.mock('../../../src/middleware/rateLimit', () => ({
  loginLimiter: jest.fn((req, res, next) => next())
}));

jest.mock('../../../src/utils/auth', () => ({
  authenticate: jest.fn((req, res, next) => {
    req.userId = 'test-user-id';
    next();
  })
}));

// NAO mockar AuthController aqui - vamos usar o real e spyar

describe('Auth Router - Complete Coverage', () => {
  let router, AuthController;

  beforeEach(() => {
    jest.clearAllMocks();
    // Require AuthController AFTER clearing mocks to get fresh reference
    const AuthControllerModule = require('../../../src/controllers/AuthController');
    AuthController = AuthControllerModule.default || AuthControllerModule;
    router = createAuthRouter();
  });

  describe('Router Structure', () => {
    it('deve retornar router', () => {
      expect(router).toBeDefined();
    });

    it('deve ser um router Express', () => {
      expect(typeof router).toBe('function');
    });

    it('deve ter stack de rotas', () => {
      expect(router.stack).toBeDefined();
      expect(Array.isArray(router.stack)).toBe(true);
    });

    it('deve definir exatamente 7 rotas', () => {
      expect(router.stack.length).toBe(7);
    });
  });

  describe('Route Paths and Methods', () => {
    it('deve ter rota POST /register', () => {
      const route = router.stack[0].route;
      expect(route.path).toBe('/register');
      expect(route.methods).toHaveProperty('post');
    });

    it('deve ter rota POST /login', () => {
      const route = router.stack[1].route;
      expect(route.path).toBe('/login');
      expect(route.methods).toHaveProperty('post');
    });

    it('deve ter rota GET /profile', () => {
      const route = router.stack[2].route;
      expect(route.path).toBe('/profile');
      expect(route.methods).toHaveProperty('get');
    });

    it('deve ter rota PUT /profile', () => {
      const route = router.stack[3].route;
      expect(route.path).toBe('/profile');
      expect(route.methods).toHaveProperty('put');
    });

    it('deve ter rota POST /complete-phase', () => {
      const route = router.stack[4].route;
      expect(route.path).toBe('/complete-phase');
      expect(route.methods).toHaveProperty('post');
    });

    it('deve ter rota GET /leaderboard', () => {
      const route = router.stack[5].route;
      expect(route.path).toBe('/leaderboard');
      expect(route.methods).toHaveProperty('get');
    });

    it('deve ter rota GET /leaderboard/me', () => {
      const route = router.stack[6].route;
      expect(route.path).toBe('/leaderboard/me');
      expect(route.methods).toHaveProperty('get');
    });
  });

  describe('Middleware Stack Configuration', () => {
    it('deve ter 2 middlewares em /register', () => {
      expect(router.stack[0].route.stack.length).toBe(2);
    });

    it('deve ter 2 middlewares em /login', () => {
      expect(router.stack[1].route.stack.length).toBe(2);
    });

    it('deve ter 2 middlewares em GET /profile', () => {
      expect(router.stack[2].route.stack.length).toBe(2);
    });

    it('deve ter 2 middlewares em PUT /profile', () => {
      expect(router.stack[3].route.stack.length).toBe(2);
    });

    it('deve ter 2 middlewares em /complete-phase', () => {
      expect(router.stack[4].route.stack.length).toBe(2);
    });

    it('deve ter 1 middleware em /leaderboard', () => {
      expect(router.stack[5].route.stack.length).toBe(1);
    });

    it('deve ter 2 middlewares em /leaderboard/me', () => {
      expect(router.stack[6].route.stack.length).toBe(2);
    });
  });

  describe('Handler Execution', () => {
    it('deve executar handler de /register', () => {
      const spy = jest.spyOn(AuthController, 'register').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[0].route.stack[1].handle;
      const req = { body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de /login', () => {
      const spy = jest.spyOn(AuthController, 'login').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[1].route.stack[1].handle;
      const req = { body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de GET /profile', () => {
      const spy = jest.spyOn(AuthController, 'getProfile').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[2].route.stack[1].handle;
      const req = { userId: '123' };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de PUT /profile', () => {
      const spy = jest.spyOn(AuthController, 'updateProfile').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[3].route.stack[1].handle;
      const req = { userId: '123', body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de /complete-phase', () => {
      const spy = jest.spyOn(AuthController, 'completePhase').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[4].route.stack[1].handle;
      const req = { userId: '123', body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de /leaderboard', () => {
      const spy = jest.spyOn(AuthController, 'getLeaderboard').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[5].route.stack[0].handle;
      const req = { query: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });

    it('deve executar handler de /leaderboard/me', () => {
      const spy = jest.spyOn(AuthController, 'getLeaderboardWithUserRank').mockImplementation((req, res) => {
        res.json({});
      });
      const handler = router.stack[6].route.stack[1].handle;
      const req = { userId: '123' };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      
      handler(req, res, jest.fn());
      
      expect(spy).toHaveBeenCalledWith(req, res);
      spy.mockRestore();
    });
  });
});

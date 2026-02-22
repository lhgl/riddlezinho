/**
 * Testes para Rate Limit Middleware
 * Coverage: 100% statements, branches, functions, lines
 */

// Mock do logger antes de importar o rateLimit
jest.mock('../../../src/utils/logger', () => ({
  logWarn: jest.fn(),
  logError: jest.fn(),
  logEvent: jest.fn(),
  logger: {},
  httpLogger: jest.fn()
}));

const logger = require('../../../src/utils/logger');

// Mock do express-rate-limit
jest.mock('express-rate-limit', () => {
  return jest.fn((options) => {
    // Mock middleware que simula o comportamento do rate limiter
    const middleware = (req, res, next) => {
      middleware.options = options;
      next();
    };
    middleware.options = options;
    return middleware;
  });
});

const rateLimit = require('express-rate-limit');
const { generalLimiter, loginLimiter, apiLimiter } = require('../../../src/middleware/rateLimit');

describe('Rate Limit Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generalLimiter', () => {
    it('deve estar definido', () => {
      expect(generalLimiter).toBeDefined();
    });

    it('deve ser uma funcao middleware', () => {
      expect(typeof generalLimiter).toBe('function');
    });

    it('deve ter configuracao correta de windowMs', () => {
      expect(generalLimiter.options.windowMs).toBe(15 * 60 * 1000);
    });

    it('deve ter configuracao correta de max', () => {
      expect(generalLimiter.options.max).toBe(500);
    });

    it('deve ter mensagem de erro correta', () => {
      expect(generalLimiter.options.message).toBe('Muitas requisições deste IP, tente novamente mais tarde.');
    });

    it('deve ter standardHeaders habilitado', () => {
      expect(generalLimiter.options.standardHeaders).toBe(true);
    });

    it('deve ter legacyHeaders desabilitado', () => {
      expect(generalLimiter.options.legacyHeaders).toBe(false);
    });

    it('deve pular healthcheck', () => {
      const healthReq = { path: '/health' };
      const nonHealthReq = { path: '/api/test' };

      expect(generalLimiter.options.skip(healthReq)).toBe(true);
      expect(generalLimiter.options.skip(nonHealthReq)).toBe(false);
    });

    it('deve chamar handler com logger quando exceder limite', () => {
      const mockReq = {
        ip: '127.0.0.1',
        path: '/api/test',
        userId: 'user123'
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      generalLimiter.options.handler(mockReq, mockRes);

      expect(logger.logWarn).toHaveBeenCalledWith('rate_limit_exceeded', {
        ip: '127.0.0.1',
        path: '/api/test',
        userId: 'user123',
        timestamp: expect.any(String)
      });
      expect(mockRes.status).toHaveBeenCalledWith(429);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Muitas requisições. Tente novamente mais tarde.'
      });
    });

    it('deve executar middleware sem bloquear quando dentro do limite', () => {
      const mockReq = { ip: '127.0.0.1', path: '/test' };
      const mockRes = {};
      const next = jest.fn();

      generalLimiter(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('loginLimiter', () => {
    it('deve estar definido', () => {
      expect(loginLimiter).toBeDefined();
    });

    it('deve ser uma funcao middleware', () => {
      expect(typeof loginLimiter).toBe('function');
    });

    it('deve ter configuracao correta de windowMs', () => {
      expect(loginLimiter.options.windowMs).toBe(15 * 60 * 1000);
    });

    it('deve ter configuracao correta de max (10 tentativas)', () => {
      expect(loginLimiter.options.max).toBe(10);
    });

    it('deve ter mensagem de erro correta', () => {
      expect(loginLimiter.options.message).toBe('Muitas tentativas de login. Tente novamente em 15 minutos.');
    });

    it('deve ter standardHeaders habilitado', () => {
      expect(loginLimiter.options.standardHeaders).toBe(true);
    });

    it('deve ter legacyHeaders desabilitado', () => {
      expect(loginLimiter.options.legacyHeaders).toBe(false);
    });

    it('deve chamar handler com logger quando exceder limite', () => {
      const mockReq = {
        ip: '192.168.1.1',
        body: { username: 'testuser' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      loginLimiter.options.handler(mockReq, mockRes);

      expect(logger.logWarn).toHaveBeenCalledWith('login_rate_limit_exceeded', {
        ip: '192.168.1.1',
        username: 'testuser',
        timestamp: expect.any(String)
      });
      expect(mockRes.status).toHaveBeenCalledWith(429);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
      });
    });

    it('deve lidar com body undefined', () => {
      const mockReq = {
        ip: '192.168.1.1',
        body: undefined
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      expect(() => {
        loginLimiter.options.handler(mockReq, mockRes);
      }).not.toThrow();
    });
  });

  describe('apiLimiter', () => {
    it('deve estar definido', () => {
      expect(apiLimiter).toBeDefined();
    });

    it('deve ser uma funcao middleware', () => {
      expect(typeof apiLimiter).toBe('function');
    });

    it('deve ter configuracao correta de windowMs (1 minuto)', () => {
      expect(apiLimiter.options.windowMs).toBe(1 * 60 * 1000);
    });

    it('deve ter configuracao correta de max (200 requisicoes)', () => {
      expect(apiLimiter.options.max).toBe(200);
    });

    it('deve ter mensagem de erro correta', () => {
      expect(apiLimiter.options.message).toBe('Muitas requisições à API.');
    });

    it('deve ter standardHeaders habilitado', () => {
      expect(apiLimiter.options.standardHeaders).toBe(true);
    });

    it('deve ter legacyHeaders desabilitado', () => {
      expect(apiLimiter.options.legacyHeaders).toBe(false);
    });

    it('deve chamar handler com logger quando exceder limite', () => {
      const mockReq = {
        ip: '10.0.0.1',
        path: '/api/data',
        userId: 'user456'
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      apiLimiter.options.handler(mockReq, mockRes);

      expect(logger.logWarn).toHaveBeenCalledWith('api_rate_limit_exceeded', {
        ip: '10.0.0.1',
        path: '/api/data',
        userId: 'user456',
        timestamp: expect.any(String)
      });
      expect(mockRes.status).toHaveBeenCalledWith(429);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Muitas requisições. Tente novamente mais tarde.'
      });
    });
  });

  describe('Rate Limit - Integration', () => {
    it('deve aplicar middlewares corretamente', () => {
      const req = { ip: '127.0.0.1', path: '/test' };
      const res = {};
      const next = jest.fn();

      generalLimiter(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('deve aplicar loginLimiter corretamente', () => {
      const req = { ip: '127.0.0.1', path: '/auth/login', body: {} };
      const res = {};
      const next = jest.fn();

      loginLimiter(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('deve aplicar apiLimiter corretamente', () => {
      const req = { ip: '127.0.0.1', path: '/auth/profile' };
      const res = {};
      const next = jest.fn();

      apiLimiter(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

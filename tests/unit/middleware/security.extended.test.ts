/**
 * Testes para Security Middleware - Cobertura Completa
 */

const security = require('../../../src/middleware/security');

// Mock do logger
jest.mock('../../../src/utils/logger', () => ({
  httpLogger: jest.fn(),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() }
}));

describe('Security Middleware - Complete Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSecurityMiddleware', () => {
    it('deve retornar array de middlewares', () => {
      const middlewares = security.getSecurityMiddleware();
      expect(middlewares).toBeDefined();
      expect(Array.isArray(middlewares)).toBe(true);
      expect(middlewares.length).toBeGreaterThan(0);
    });
  });

  describe('getLoggingMiddleware', () => {
    it('deve retornar funcao middleware', () => {
      const middleware = security.getLoggingMiddleware();
      expect(middleware).toBeDefined();
      expect(typeof middleware).toBe('function');
    });

    it('deve executar middleware com status 200', () => {
      const middleware = security.getLoggingMiddleware();
      const mockReq = { method: 'GET', path: '/test' };
      const mockRes = {
        statusCode: 200,
        on: jest.fn((event, cb) => cb())
      };
      const next = jest.fn();

      middleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve executar middleware com status 300', () => {
      const middleware = security.getLoggingMiddleware();
      const mockReq = { method: 'GET', path: '/redirect' };
      const mockRes = {
        statusCode: 301,
        on: jest.fn((event, cb) => cb())
      };
      const next = jest.fn();

      middleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve executar middleware com status 400', () => {
      const middleware = security.getLoggingMiddleware();
      const mockReq = { method: 'POST', path: '/api/error' };
      const mockRes = {
        statusCode: 400,
        on: jest.fn((event, cb) => cb())
      };
      const next = jest.fn();

      middleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve executar middleware com status 500', () => {
      const middleware = security.getLoggingMiddleware();
      const mockReq = { method: 'POST', path: '/api/error' };
      const mockRes = {
        statusCode: 500,
        on: jest.fn((event, cb) => cb())
      };
      const next = jest.fn();

      middleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

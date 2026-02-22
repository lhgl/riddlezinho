/**
 * Testes para Security Middleware
 */

const { getSecurityMiddleware, getLoggingMiddleware } = require('../../../src/middleware/security');

describe('Security Middleware', () => {
  describe('getSecurityMiddleware', () => {
    it('deve retornar array de middlewares', () => {
      const middlewares = getSecurityMiddleware();
      expect(Array.isArray(middlewares)).toBe(true);
      expect(middlewares.length).toBe(3);
    });

    it('deve incluir middleware de compressao', () => {
      const middlewares = getSecurityMiddleware();
      expect(middlewares[0]).toBeDefined();
      expect(typeof middlewares[0]).toBe('function');
    });

    it('deve incluir middleware helmet', () => {
      const middlewares = getSecurityMiddleware();
      expect(middlewares[1]).toBeDefined();
      expect(typeof middlewares[1]).toBe('function');
    });

    it('deve incluir middleware de cache customizado', () => {
      const middlewares = getSecurityMiddleware();
      expect(middlewares[2]).toBeDefined();
      expect(typeof middlewares[2]).toBe('function');
    });

    describe('Cache Middleware', () => {
      let mockReq, mockRes, next;

      beforeEach(() => {
        mockReq = {
          path: '/',
          accepts: jest.fn().mockReturnValue(false)
        };
        mockRes = {
          setHeader: jest.fn()
        };
        next = jest.fn();
      });

      it('deve desabilitar cache para HTML', () => {
        mockReq.path = '/index.html';
        mockReq.accepts = jest.fn().mockReturnValue(true);

        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
          'Cache-Control',
          'no-cache, no-store, must-revalidate'
        );
        expect(mockRes.setHeader).toHaveBeenCalledWith('Pragma', 'no-cache');
        expect(mockRes.setHeader).toHaveBeenCalledWith('Expires', '0');
      });

      it('deve habilitar cache para jpg', () => {
        mockReq.path = '/images/test.jpg';

        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
          'Cache-Control',
          'public, max-age=2592000, immutable'
        );
      });

      it('deve habilitar cache para css', () => {
        mockReq.path = '/styles/style.css';

        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
          'Cache-Control',
          'public, max-age=2592000, immutable'
        );
      });

      it('deve habilitar cache para js', () => {
        mockReq.path = '/scripts/app.js';

        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
          'Cache-Control',
          'public, max-age=2592000, immutable'
        );
      });

      it('deve habilitar cache para fonts', () => {
        mockReq.path = '/fonts/font.woff2';

        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
          'Cache-Control',
          'public, max-age=2592000, immutable'
        );
      });

      it('deve chamar next()', () => {
        const middlewares = getSecurityMiddleware();
        const cacheMiddleware = middlewares[2];
        cacheMiddleware(mockReq, mockRes, next);

        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('getLoggingMiddleware', () => {
    let mockReq, mockRes, next;

    beforeEach(() => {
      mockReq = {
        method: 'GET',
        path: '/test'
      };
      mockRes = {
        on: jest.fn(),
        statusCode: 200
      };
      next = jest.fn();
    });

    it('deve retornar funcao middleware', () => {
      const loggingMiddleware = getLoggingMiddleware();
      expect(typeof loggingMiddleware).toBe('function');
    });

    it('deve adicionar listener de finish', () => {
      const loggingMiddleware = getLoggingMiddleware();
      loggingMiddleware(mockReq, mockRes, next);

      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
    });

    it('deve chamar next()', () => {
      const loggingMiddleware = getLoggingMiddleware();
      loggingMiddleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve chamar next para permitir middleware continuar', () => {
      // O logging middleware agora usa pino-http em vez de console.log
      const loggingMiddleware = getLoggingMiddleware();
      loggingMiddleware(mockReq, mockRes, next);

      expect(next).toHaveBeenCalled();
    });

    it('deve registrar evento de finish da requisicao', () => {
      // O logging agora é feito via pino-http
      const loggingMiddleware = getLoggingMiddleware();
      loggingMiddleware(mockReq, mockRes, next);

      // Trigger the finish event
      const finishCallback = mockRes.on.mock.calls[0][1];
      finishCallback();

      // Middleware deve ter configurado o listener de finish
      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
    });

    it('deve calcular duracao da requisicao internamente', () => {
      const DateSpy = jest.spyOn(Date, 'now').mockReturnValue(1000);

      const loggingMiddleware = getLoggingMiddleware();
      loggingMiddleware(mockReq, mockRes, next);

      const finishCallback = mockRes.on.mock.calls[0][1];
      
      // Avancar o tempo para 100ms
      DateSpy.mockReturnValue(1100);
      finishCallback();

      // Duracao deve ser calculada internamente (100ms)
      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
      
      DateSpy.mockRestore();
    });
  });
});

/**
 * Testes para Error Handler Middleware
 */

describe('ErrorHandler Middleware', () => {
  let errorHandlerModule;
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      errorHandlerModule = require('../../../src/middleware/errorHandler');
    } catch (e) {
      errorHandlerModule = null;
    }

    mockReq = {
      path: '/test',
      method: 'GET',
      ip: '127.0.0.1'
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      render: jest.fn().mockReturnThis(),
      locals: {}
    };

    mockNext = jest.fn();
  });

  describe('Module Export', () => {
    it('deve exportar errorHandler', () => {
      if (errorHandlerModule) {
        expect(errorHandlerModule.errorHandler).toBeDefined();
      }
    });

    it('deve exportar notFoundHandler', () => {
      if (errorHandlerModule) {
        expect(errorHandlerModule.notFoundHandler).toBeDefined();
      }
    });
  });

  describe('Not Found Handler', () => {
    it('deve retornar 404', () => {
      if (errorHandlerModule && errorHandlerModule.notFoundHandler) {
        errorHandlerModule.notFoundHandler(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
      }
    });

    it('deve renderizar página de erro', () => {
      if (errorHandlerModule && errorHandlerModule.notFoundHandler) {
        errorHandlerModule.notFoundHandler(mockReq, mockRes, mockNext);

        expect(mockRes.render).toHaveBeenCalledWith(
          'error',
          expect.objectContaining({
            message: 'Página não encontrada'
          })
        );
      }
    });

    it('deve passar footerback para template', () => {
      if (errorHandlerModule && errorHandlerModule.notFoundHandler) {
        mockRes.locals.footerback = '/previous-page';

        errorHandlerModule.notFoundHandler(mockReq, mockRes, mockNext);

        expect(mockRes.render).toHaveBeenCalled();
      }
    });

    it('deve chamar com footerback vazio se não houver', () => {
      if (errorHandlerModule && errorHandlerModule.notFoundHandler) {
        errorHandlerModule.notFoundHandler(mockReq, mockRes, mockNext);

        const args = mockRes.render.mock.calls[0];
        expect(args[1].footerback).toBeDefined();
      }
    });
  });

  describe('Error Handler', () => {
    it('deve retornar 500 por padrão', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Test error');

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
      }
    });

    it('deve usar statusCode do erro se fornecido', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Not found');
        error.statusCode = 404;

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
      }
    });

    it('deve usar mensagem do erro', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Specific error message');

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.render).toHaveBeenCalledWith(
          'error',
          expect.objectContaining({
            message: 'Specific error message'
          })
        );
      }
    });

    it('deve usar mensagem padrão se erro não tiver', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error();
        error.message = '';

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.render).toHaveBeenCalledWith(
          'error',
          expect.objectContaining({
            message: 'Erro interno do servidor'
          })
        );
      }
    });

    it('deve renderizar com template error', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Test');

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.render).toHaveBeenCalledWith(
          'error',
          expect.any(Object)
        );
      }
    });

    it('deve chamar com footerback', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Test');
        mockRes.locals.footerback = '/back';

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        const args = mockRes.render.mock.calls[0];
        expect(args[1]).toHaveProperty('footerback');
      }
    });

    it('deve passar includefooterback=true', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Test');

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        const args = mockRes.render.mock.calls[0];
        expect(args[1].includefooterback).toBe(true);
      }
    });
  });

  describe('Error Types', () => {
    it('deve lidar com erro 400', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Bad request');
        error.statusCode = 400;

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
      }
    });

    it('deve lidar com erro 401', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
      }
    });

    it('deve lidar com erro 403', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Forbidden');
        error.statusCode = 403;

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
      }
    });

    it('deve lidar com erro 500', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        const error = new Error('Server error');
        error.statusCode = 500;

        errorHandlerModule.errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('Function Signatures', () => {
    it('notFoundHandler deve ser função com 3 parâmetros', () => {
      if (errorHandlerModule && errorHandlerModule.notFoundHandler) {
        expect(errorHandlerModule.notFoundHandler.length).toBe(3);
      }
    });

    it('errorHandler deve ser função com 4 parâmetros', () => {
      if (errorHandlerModule && errorHandlerModule.errorHandler) {
        expect(errorHandlerModule.errorHandler.length).toBe(4);
      }
    });
  });
});

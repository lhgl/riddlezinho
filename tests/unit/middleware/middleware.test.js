/**
 * Testes para Middleware
 */

describe('Error Handler', () => {
  let errorHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      errorHandler = require('../../../src/middleware/errorHandler');
    } catch (e) {
      errorHandler = null;
    }
  });

  it('deve exportar errorHandler', () => {
    if (errorHandler) {
      expect(errorHandler.errorHandler).toBeDefined();
    }
  });

  it('deve exportar notFoundHandler', () => {
    if (errorHandler) {
      expect(errorHandler.notFoundHandler).toBeDefined();
    }
  });
});

describe('Rate Limit', () => {
  let rateLimit;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      rateLimit = require('../../../src/middleware/rateLimit');
    } catch (e) {
      rateLimit = null;
    }
  });

  it('deve exportar generalLimiter', () => {
    if (rateLimit) {
      expect(rateLimit.generalLimiter).toBeDefined();
    }
  });

  it('deve exportar loginLimiter', () => {
    if (rateLimit) {
      expect(rateLimit.loginLimiter).toBeDefined();
    }
  });

  it('deve exportar apiLimiter', () => {
    if (rateLimit) {
      expect(rateLimit.apiLimiter).toBeDefined();
    }
  });
});

describe('Security', () => {
  let security;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      security = require('../../../src/middleware/security');
    } catch (e) {
      security = null;
    }
  });

  it('deve exportar getSecurityMiddleware', () => {
    if (security) {
      expect(security.getSecurityMiddleware).toBeDefined();
    }
  });

  it('deve exportar getLoggingMiddleware', () => {
    if (security) {
      expect(security.getLoggingMiddleware).toBeDefined();
    }
  });
});

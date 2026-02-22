/**
 * Testes para Logger
 */

const logger = require('../../../src/utils/logger');

describe('Logger', () => {
  describe('exports', () => {
    it('deve exportar logger', () => {
      expect(logger.logger).toBeDefined();
    });

    it('deve exportar httpLogger', () => {
      expect(logger.httpLogger).toBeDefined();
    });

    it('deve exportar addRequestMetadata', () => {
      expect(logger.addRequestMetadata).toBeDefined();
      expect(typeof logger.addRequestMetadata).toBe('function');
    });

    it('deve exportar logEvent', () => {
      expect(logger.logEvent).toBeDefined();
      expect(typeof logger.logEvent).toBe('function');
    });

    it('deve exportar logError', () => {
      expect(logger.logError).toBeDefined();
      expect(typeof logger.logError).toBe('function');
    });

    it('deve exportar logWarn', () => {
      expect(logger.logWarn).toBeDefined();
      expect(typeof logger.logWarn).toBe('function');
    });
  });

  describe('logEvent', () => {
    it('deve ser uma funcao', () => {
      expect(typeof logger.logEvent).toBe('function');
    });

    it('deve aceitar eventName e data', () => {
      expect(() => {
        logger.logEvent('test_event', { foo: 'bar' });
      }).not.toThrow();
    });

    it('deve funcionar sem data', () => {
      expect(() => {
        logger.logEvent('test_event');
      }).not.toThrow();
    });
  });

  describe('logError', () => {
    it('deve ser uma funcao', () => {
      expect(typeof logger.logError).toBe('function');
    });

    it('deve aceitar error e data', () => {
      const error = new Error('Test error');
      expect(() => {
        logger.logError('test_error', error, { foo: 'bar' });
      }).not.toThrow();
    });

    it('deve funcionar sem data', () => {
      const error = new Error('Test error');
      expect(() => {
        logger.logError('test_error', error);
      }).not.toThrow();
    });
  });

  describe('logWarn', () => {
    it('deve ser uma funcao', () => {
      expect(typeof logger.logWarn).toBe('function');
    });

    it('deve aceitar eventName e data', () => {
      expect(() => {
        logger.logWarn('test_warn', { foo: 'bar' });
      }).not.toThrow();
    });

    it('deve funcionar sem data', () => {
      expect(() => {
        logger.logWarn('test_warn');
      }).not.toThrow();
    });
  });

  describe('logger instance', () => {
    it('deve ter metodo info', () => {
      expect(typeof logger.logger.info).toBe('function');
    });

    it('deve ter metodo error', () => {
      expect(typeof logger.logger.error).toBe('function');
    });

    it('deve ter metodo warn', () => {
      expect(typeof logger.logger.warn).toBe('function');
    });

    it('deve ter metodo debug', () => {
      expect(typeof logger.logger.debug).toBe('function');
    });
  });

  describe('httpLogger', () => {
    it('deve ser uma funcao', () => {
      expect(typeof logger.httpLogger).toBe('function');
    });

    it('deve ter middleware properties', () => {
      expect(logger.httpLogger).toBeDefined();
    });
  });
});

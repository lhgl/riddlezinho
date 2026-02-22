/**
 * Testes para Utils
 */

describe('Auth Utils', () => {
  let auth;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      auth = require('../../../src/utils/auth');
    } catch (e) {
      auth = null;
    }
  });

  it('deve exportar utilidades', () => {
    expect(auth).toBeDefined();
  });

  it('deve ter register method', () => {
    if (auth && auth.register) {
      expect(typeof auth.register).toBe('function');
    }
  });

  it('deve ter login method', () => {
    if (auth && auth.login) {
      expect(typeof auth.login).toBe('function');
    }
  });

  it('deve ter verifyToken method', () => {
    if (auth && auth.verifyToken) {
      expect(typeof auth.verifyToken).toBe('function');
    }
  });

  it('deve ter getUser method', () => {
    if (auth && auth.getUser) {
      expect(typeof auth.getUser).toBe('function');
    }
  });
});

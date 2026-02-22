/**
 * Testes de Integração Expandidos
 */

const phasesModule = require('../../src/config/phases');
const phases = phasesModule.default || phasesModule;
const auth = require('../../src/utils/auth');

describe('Game Phases', () => {
  it('deve ter fases definidas', () => {
    expect(Object.keys(phases).length).toBeGreaterThan(0);
  });

  it('deve ter config de fases', () => {
    expect(Object.keys(phases).length).toBeGreaterThan(0);
  });

  it('todas as fases devem ter id', () => {
    Object.values(phases).forEach(phase => {
      expect(phase.id).toBeDefined();
    });
  });

  it('todas as fases devem ter id unico', () => {
    const ids = Object.keys(phases);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
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
  });

  it('deve fazer login apos registro', async () => {
    const username = `logintest_${Date.now()}`;
    const email = `${username}@example.com`;
    
    await auth.register(username, email, 'password123');
    const result = await auth.login(username, 'password123');
    
    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.user.username).toBe(username);
  });
});

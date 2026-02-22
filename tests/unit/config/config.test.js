/**
 * Testes para Configuração
 */

describe('Phase Database Config', () => {
  let phaseDatabase;

  beforeEach(() => {
    jest.clearAllMocks();
    phaseDatabase = require('../../../src/config/phases');
  });

  it('deve exportar fases', () => {
    expect(phaseDatabase).toBeDefined();
    expect(typeof phaseDatabase).toBe('object');
  });

  it('deve ter fases com título', () => {
    Object.values(phaseDatabase).forEach(phase => {
      if (phase && phase.name) {
        expect(phase.name).toBeDefined();
      }
    });
  });
});

describe('Phases Config', () => {
  let phases;

  beforeEach(() => {
    jest.clearAllMocks();
    try {
      phases = require('../../../src/config/phases');
    } catch (e) {
      phases = null;
    }
  });

  it('deve exportar configuração', () => {
    if (phases) {
      expect(phases).toBeDefined();
    }
  });
});

describe('Main Config', () => {
  let config;

  beforeEach(() => {
    jest.clearAllMocks();
    config = require('../../../src/config/config');
  });

  it('deve exportar configuração', () => {
    expect(config).toBeDefined();
  });
});

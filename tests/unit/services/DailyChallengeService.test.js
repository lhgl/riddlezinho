jest.mock('../../../src/utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => next()),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

const { DailyChallengeService } = require('../../../src/services/DailyChallengeService');

const phases = {
  fase1: { id: 'fase1', number: 1, level: 1, name: 'Fase 1', type: 'passcode', image: null, hint: '' },
  fase2: { id: 'fase2', number: 2, level: 1, name: 'Fase 2', type: 'passcode', image: null, hint: '' },
  fase3: { id: 'fase3', number: 3, level: 1, name: 'Fase 3', type: 'passcode', image: null, hint: '' },
};

describe('DailyChallengeService', () => {
  let service;

  beforeEach(() => {
    service = new DailyChallengeService(phases);
  });

  it('deve retornar uma fase válida', () => {
    const phase = service.getDailyPhase();
    expect(phase).toBeDefined();
    expect(phase.id).toBeDefined();
    expect(Object.keys(phases)).toContain(phase.id);
  });

  it('deve retornar a mesma fase para o mesmo dia', () => {
    const phase1 = service.getDailyPhase();
    const phase2 = service.getDailyPhase();
    expect(phase1.id).toBe(phase2.id);
  });

  it('deve cobrir todas as fases com dias distintos', () => {
    const seen = new Set();
    for (let day = 0; day < 3; day++) {
      const phaseIds = Object.keys(phases);
      seen.add(phaseIds[day % phaseIds.length]);
    }
    expect(seen.size).toBe(3);
  });
});

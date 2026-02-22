/**
 * Setup para Testes
 */

// Aumentar timeout para testes mais lentos
jest.setTimeout(10000);

// Mock do logger em testes
jest.mock('../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  },
  httpLogger: jest.fn((req, res, next) => next()),
  addRequestMetadata: jest.fn((req, res, next) => {
    req.requestId = 'test-request-id';
    req.userId = 'test-user-id';
    next();
  }),
  logEvent: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn()
}));

// Silenciar console durante testes
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Cleanup após cada teste
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// Cleanup final após todos os testes
afterAll(async () => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.restoreAllMocks();
  
  // Aguardar promises pendentes e timers
  await new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, 50);
  });
});

// Detectar timers ativos e limpá-los
if (global.gc) {
  afterAll(() => {
    global.gc();
  });
}


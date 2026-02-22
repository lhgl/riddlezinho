/**
 * Testes para Routes - Focado em testes unitarios simples
 * Coverage: 100% statements, branches, functions, lines
 */

const createHomeRouterModule = require('../../../src/routes/home');
const createHomeRouter = createHomeRouterModule.default || createHomeRouterModule;
const createPhasesRouterModule = require('../../../src/routes/phases');
const createPhasesRouter = createPhasesRouterModule.default || createPhasesRouterModule;
const createTipsRouterModule = require('../../../src/routes/tips');
const createTipsRouter = createTipsRouterModule.default || createTipsRouterModule;

// Mock dos middlewares e controllers
jest.mock('../../../src/middleware/rateLimit', () => ({
  loginLimiter: (req, res, next) => next(),
  apiLimiter: (req, res, next) => next()
}));

jest.mock('../../../src/utils/auth', () => ({
  authenticate: (req, res, next) => {
    req.userId = 'test-user-id';
    next();
  }
}));

const mockPhaseController = {
  renderIndex: jest.fn((req, res) => res.send('index')),
  renderGame: jest.fn((req, res) => res.send('game')),
  renderPhase: jest.fn((req, res) => res.json({ phase: req.params.phaseId })),
  renderTip: jest.fn((req, res) => res.send(`tip: ${req.params.tipId}`)),
  getPhasesList: jest.fn((req, res) => res.json({ phases: [] })),
  getPhaseData: jest.fn((req, res) => res.json({ id: req.params.phaseId }))
};

describe('Home Router', () => {
  let router;

  beforeEach(() => {
    jest.clearAllMocks();
    router = createHomeRouter(mockPhaseController);
  });

  it('deve retornar router', () => {
    expect(router).toBeDefined();
  });

  it('deve ser um router Express', () => {
    expect(typeof router).toBe('function');
  });

  it('deve ter stack de rotas', () => {
    expect(router.stack).toBeDefined();
    expect(Array.isArray(router.stack)).toBe(true);
  });

  it('deve definir exatamente 4 rotas', () => {
    expect(router.stack.length).toBe(4);
  });

  it('deve chamar renderIndex na rota /', () => {
    const mockReq = { path: '/', method: 'GET' };
    const mockRes = { send: jest.fn() };
    const handler = router.stack[0].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockPhaseController.renderIndex).toHaveBeenCalled();
  });

  it('deve chamar renderGame na rota /jogar', () => {
    const mockReq = { path: '/jogar', method: 'GET' };
    const mockRes = { send: jest.fn() };
    const handler = router.stack[1].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockPhaseController.renderGame).toHaveBeenCalled();
  });

  it('deve renderizar login na rota /login', () => {
    const mockReq = { path: '/login', method: 'GET' };
    const mockRes = { render: jest.fn() };
    const handler = router.stack[2].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockRes.render).toHaveBeenCalledWith('login');
  });

  it('deve renderizar leaderboard na rota /leaderboard', () => {
    const mockReq = { path: '/leaderboard', method: 'GET' };
    const mockRes = { render: jest.fn() };
    const handler = router.stack[3].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockRes.render).toHaveBeenCalledWith('leaderboard');
  });
});

describe('Phases Router', () => {
  let router, mockPhases;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPhases = {
      fase1: { id: 'fase1', number: 1, name: 'Fase 1' },
      fase2: { id: 'fase2', number: 2, name: 'Fase 2' }
    };
    router = createPhasesRouter(mockPhaseController, mockPhases);
  });

  it('deve retornar router', () => {
    expect(router).toBeDefined();
  });

  it('deve ser um router Express', () => {
    expect(typeof router).toBe('function');
  });

  it('deve ter stack de rotas', () => {
    expect(router.stack).toBeDefined();
    expect(Array.isArray(router.stack)).toBe(true);
  });

  it('deve definir exatamente 3 rotas', () => {
    expect(router.stack.length).toBe(3);
  });

  it('deve chamar renderPhase na rota /:phaseId', () => {
    const mockReq = { params: { phaseId: 'fase1' }, path: '/fase1', method: 'GET' };
    const mockRes = { json: jest.fn() };
    const handler = router.stack[0].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockPhaseController.renderPhase).toHaveBeenCalled();
  });

  it('deve chamar getPhasesList na rota /api/list', () => {
    const mockReq = { path: '/api/list', method: 'GET' };
    const mockRes = { json: jest.fn() };
    const handler = router.stack[1].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockPhaseController.getPhasesList).toHaveBeenCalled();
  });

  it('deve chamar getPhaseData na rota /api/phase/:phaseId', () => {
    const mockReq = { params: { phaseId: 'fase1' }, path: '/api/phase/fase1', method: 'GET' };
    const mockRes = { json: jest.fn() };
    const next = jest.fn();
    const handler = router.stack[2].route.stack[0].handle;
    handler(mockReq, mockRes, next);
    expect(mockPhaseController.getPhaseData).toHaveBeenCalled();
  });
});

describe('Tips Router', () => {
  let router;

  beforeEach(() => {
    jest.clearAllMocks();
    router = createTipsRouter(mockPhaseController);
  });

  it('deve retornar router', () => {
    expect(router).toBeDefined();
  });

  it('deve ser um router Express', () => {
    expect(typeof router).toBe('function');
  });

  it('deve ter stack de rotas', () => {
    expect(router.stack).toBeDefined();
    expect(Array.isArray(router.stack)).toBe(true);
  });

  it('deve definir exatamente 1 rota', () => {
    expect(router.stack.length).toBe(1);
  });

  it('deve chamar renderTip na rota /:tipId', () => {
    const mockReq = { params: { tipId: 'dica1' }, path: '/dica1', method: 'GET' };
    const mockRes = { send: jest.fn() };
    const handler = router.stack[0].route.stack[0].handle;
    handler(mockReq, mockRes, jest.fn());
    expect(mockPhaseController.renderTip).toHaveBeenCalled();
  });
});

describe('Routes - Factory Functions', () => {
  it('deve criar home router com controller', () => {
    const mockController = { renderIndex: jest.fn(), renderGame: jest.fn() };
    const router = createHomeRouter(mockController);
    expect(router).toBeDefined();
    expect(typeof router).toBe('function');
  });

  it('deve criar phases router com controller e phases', () => {
    const mockController = { renderPhase: jest.fn(), getPhasesList: jest.fn(), getPhaseData: jest.fn() };
    const mockPhases = { fase1: { id: 'fase1' } };
    const router = createPhasesRouter(mockController, mockPhases);
    expect(router).toBeDefined();
    expect(typeof router).toBe('function');
  });

  it('deve criar tips router com controller', () => {
    const mockController = { renderTip: jest.fn() };
    const router = createTipsRouter(mockController);
    expect(router).toBeDefined();
    expect(typeof router).toBe('function');
  });
});

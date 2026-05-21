/**
 * Testes para middleware de validação de input
 */

const { validateRegister, validateLogin } = require('../../../src/middleware/validation');

const buildRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
});

describe('validateRegister', () => {
  let next;
  let res;

  beforeEach(() => {
    next = jest.fn();
    res = buildRes();
  });

  it('deve chamar next() para dados válidos', () => {
    const req = {
      body: { username: 'testuser', email: 'test@example.com', password: 'password123' }
    };
    validateRegister(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('deve rejeitar request sem username', () => {
    const req = { body: { email: 'test@example.com', password: 'password123' } };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar request sem email', () => {
    const req = { body: { username: 'testuser', password: 'password123' } };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar request sem password', () => {
    const req = { body: { username: 'testuser', email: 'test@example.com' } };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar email inválido', () => {
    const req = {
      body: { username: 'testuser', email: 'invalido', password: 'password123' }
    };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Email inválido' }));
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar username muito curto (< 3 chars)', () => {
    const req = {
      body: { username: 'ab', email: 'test@example.com', password: 'password123' }
    };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar username muito longo (> 30 chars)', () => {
    const req = {
      body: {
        username: 'a'.repeat(31),
        email: 'test@example.com',
        password: 'password123'
      }
    };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar username com caracteres inválidos', () => {
    const req = {
      body: { username: 'user@name!', email: 'test@example.com', password: 'password123' }
    };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve aceitar username com underscores e hífens', () => {
    const req = {
      body: { username: 'user_name-123', email: 'test@example.com', password: 'password123' }
    };
    validateRegister(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deve rejeitar senha com menos de 8 caracteres', () => {
    const req = {
      body: { username: 'testuser', email: 'test@example.com', password: 'short' }
    };
    validateRegister(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('validateLogin', () => {
  let next;
  let res;

  beforeEach(() => {
    next = jest.fn();
    res = buildRes();
  });

  it('deve chamar next() para dados válidos', () => {
    const req = { body: { username: 'testuser', password: 'password123' } };
    validateLogin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deve rejeitar sem username', () => {
    const req = { body: { password: 'password123' } };
    validateLogin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('deve rejeitar sem password', () => {
    const req = { body: { username: 'testuser' } };
    validateLogin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});

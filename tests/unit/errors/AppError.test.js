/**
 * Testes para a hierarquia de erros AppError
 */

const { AppError, ValidationError, AuthenticationError, NotFoundError, ConflictError } =
  require('../../../src/errors/AppError');

describe('AppError', () => {
  it('deve criar erro com message, statusCode e isOperational', () => {
    const err = new AppError('Algo deu errado', 500);
    expect(err.message).toBe('Algo deu errado');
    expect(err.statusCode).toBe(500);
    expect(err.isOperational).toBe(true);
  });

  it('deve herdar de Error', () => {
    const err = new AppError('erro', 400);
    expect(err).toBeInstanceOf(Error);
  });

  it('deve definir name como nome da classe', () => {
    const err = new AppError('erro', 500);
    expect(err.name).toBe('AppError');
  });

  it('deve suportar isOperational=false para erros de programação', () => {
    const err = new AppError('bug', 500, false);
    expect(err.isOperational).toBe(false);
  });

  it('deve ter stack trace', () => {
    const err = new AppError('erro', 500);
    expect(err.stack).toBeDefined();
  });
});

describe('ValidationError', () => {
  it('deve ter statusCode 400', () => {
    const err = new ValidationError('campo inválido');
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('campo inválido');
  });

  it('deve ser instância de AppError e Error', () => {
    const err = new ValidationError('campo inválido');
    expect(err).toBeInstanceOf(AppError);
    expect(err).toBeInstanceOf(Error);
  });

  it('deve ter isOperational=true', () => {
    const err = new ValidationError('campo inválido');
    expect(err.isOperational).toBe(true);
  });

  it('deve ter name ValidationError', () => {
    const err = new ValidationError('campo inválido');
    expect(err.name).toBe('ValidationError');
  });
});

describe('AuthenticationError', () => {
  it('deve ter statusCode 401', () => {
    const err = new AuthenticationError('não autenticado');
    expect(err.statusCode).toBe(401);
  });

  it('deve ser instância de AppError', () => {
    const err = new AuthenticationError('não autenticado');
    expect(err).toBeInstanceOf(AppError);
  });

  it('deve ter name AuthenticationError', () => {
    const err = new AuthenticationError('não autenticado');
    expect(err.name).toBe('AuthenticationError');
  });
});

describe('NotFoundError', () => {
  it('deve ter statusCode 404', () => {
    const err = new NotFoundError('recurso não encontrado');
    expect(err.statusCode).toBe(404);
  });

  it('deve ser instância de AppError', () => {
    const err = new NotFoundError('recurso não encontrado');
    expect(err).toBeInstanceOf(AppError);
  });

  it('deve ter name NotFoundError', () => {
    const err = new NotFoundError('recurso não encontrado');
    expect(err.name).toBe('NotFoundError');
  });
});

describe('ConflictError', () => {
  it('deve ter statusCode 409', () => {
    const err = new ConflictError('recurso já existe');
    expect(err.statusCode).toBe(409);
  });

  it('deve ser instância de AppError', () => {
    const err = new ConflictError('recurso já existe');
    expect(err).toBeInstanceOf(AppError);
  });

  it('deve ter name ConflictError', () => {
    const err = new ConflictError('recurso já existe');
    expect(err.name).toBe('ConflictError');
  });
});

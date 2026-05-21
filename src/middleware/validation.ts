/**
 * Middlewares de validação de input para rotas de autenticação
 */

import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;
const PASSWORD_MIN_LENGTH = 8;

/**
 * Valida payload de registro: email, username e senha
 */
export function validateRegister(req: Request, res: Response, next: NextFunction): void {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email e password são obrigatórios' });
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: 'Email inválido' });
    return;
  }

  if (!USERNAME_REGEX.test(username)) {
    res.status(400).json({
      error: 'Username deve ter entre 3 e 30 caracteres alfanuméricos (permite _ e -)'
    });
    return;
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    res.status(400).json({
      error: `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`
    });
    return;
  }

  next();
}

/**
 * Valida payload de login: presença de username e password
 */
export function validateLogin(req: Request, res: Response, next: NextFunction): void {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username e password são obrigatórios' });
    return;
  }

  next();
}

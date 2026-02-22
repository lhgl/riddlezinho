/**
 * Middleware para tratamento de erros
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Handler para 404 - página não encontrada
 */
export function notFoundHandler(req: Request, res: Response, _next: NextFunction): void {
  res.status(404).render('error', {
    footerback: res.locals.footerback || '',
    includefooterback: true,
    message: 'Página não encontrada'
  });
}

/**
 * Handler para erros geral
 */
export function errorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Erro:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).render('error', {
    footerback: res.locals.footerback || '',
    includefooterback: true,
    message
  });
}

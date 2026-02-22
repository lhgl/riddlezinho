/**
 * Middleware para segurança e otimizações
 */

import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

/**
 * Retorna array de middlewares de segurança
 */
export function getSecurityMiddleware(): Array<(req: Request, res: Response, next: NextFunction) => void> {
  return [
    // Compressão gzip
    compression({
      level: 6,
      threshold: 1024
    }),
    // Headers de segurança
    helmet({
      contentSecurityPolicy: false, // Ajustável conforme necessidade
      xssFilter: true,
      noSniff: true,
      frameguard: { action: 'deny' },
      referrerPolicy: { policy: 'no-referrer' }
    }),
    // Middleware customizado para cache
    (req: Request, res: Response, next: NextFunction) => {
      // Disable cache para HTML
      if (req.path.endsWith('.html') || req.accepts('text/html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
      // Cache static assets por 30 dias
      else if (/\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|eot|ttf|svg)$/i.test(req.path)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
      }
      next();
    }
  ];
}

/**
 * Middleware para logging simplificado
 */
export function getLoggingMiddleware(): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      // Logging via pino-http no logger.ts
    });
    next();
  };
}

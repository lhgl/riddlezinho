/**
 * Middleware de Rate Limiting
 * Protege contra abuso de requisições
 */

import { Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { logWarn } from '../utils/logger';

/**
 * Limitador geral de requisições
 * 500 requisições por 15 minutos por IP (ajustado para desenvolvimento)
 */
export const generalLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500, // limite de requisições
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  standardHeaders: true, // retorna limite em `RateLimit-*` headers
  legacyHeaders: false, // desativa `X-RateLimit-*` headers
  skip: (req: Request) => {
    // Não aplica a rate limit para healthcheck
    return req.path === '/health';
  },
  handler: (req: Request, res: Response) => {
    logWarn('rate_limit_exceeded', {
      ip: req.ip as string,
      path: req.path,
      userId: (req as any).userId,
      timestamp: new Date().toISOString()
    });
    res.status(429).json({
      error: 'Muitas requisições. Tente novamente mais tarde.'
    });
  }
});

/**
 * Limitador mais rigoroso para login
 * 10 tentativas por 15 minutos (ajustado para desenvolvimento)
 */
export const loginLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logWarn('login_rate_limit_exceeded', {
      ip: req.ip as string,
      username: req.body?.username,
      timestamp: new Date().toISOString()
    });
    res.status(429).json({
      error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    });
  }
});

/**
 * Limitador para API
 * 200 requisições por minuto (ajustado para desenvolvimento)
 */
export const apiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: 'Muitas requisições à API.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logWarn('api_rate_limit_exceeded', {
      ip: req.ip as string,
      path: req.path,
      userId: (req as any).userId,
      timestamp: new Date().toISOString()
    });
    res.status(429).json({
      error: 'Muitas requisições. Tente novamente mais tarde.'
    });
  }
});

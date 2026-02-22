/**
 * Logger Estruturado com Pino
 * Logs em JSON com UID único por sessão de usuário
 */

import pino, { Logger } from 'pino';
import pinoHttp, { HttpLogger } from 'pino-http';
import { v4 as uuidv4 } from 'uuid';

// Configurar Pino Logger
const logger: Logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: process.env.NODE_ENV !== 'production',
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  },
  base: {
    env: process.env.NODE_ENV || 'development',
    version: '2.5.0'
  }
});

/**
 * Middleware HTTP Logger com Pino
 * Adiciona requestId único para rastreamento
 */
const httpLogger: HttpLogger = pinoHttp({
  logger: logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessObject: (req, res, responseTime) => {
    return {
      req: {
        method: req.method,
        url: req.url,
        headers: req.headers as Record<string, string>
      },
      res: {
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`
      },
      msg: `${req.method} ${req.url} - ${res.statusCode}`
    };
  },
  customErrorObject: (req, res, err, responseTime) => {
    return {
      req: {
        method: req.method,
        url: req.url,
        headers: req.headers as Record<string, string>
      },
      res: {
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`
      },
      err: {
        message: err.message,
        stack: err.stack,
        name: err.name
      },
      msg: `${req.method} ${req.url} - ERROR: ${err.message}`
    };
  }
});

/**
 * Middleware para adicionar requestId e userId à requisição
 */
export function addRequestMetadata(req: any, res: any, next: () => void): void {
  // Gerar requestId único para rastreamento
  req.requestId = req.get('x-request-id') || uuidv4();

  // UID do usuário (será preenchido após autenticação)
  req.userId = req.get('x-user-id') || 'anonymous';

  // Adicionar requestId ao response header
  res.setHeader('x-request-id', req.requestId);

  // Anexar ao logger do request
  if (req.log) {
    req.log = req.log.child({
      requestId: req.requestId,
      userId: req.userId
    });
  }

  next();
}

/**
 * Log estruturado personalizado
 * Exemplo: logger.info({ event: 'user_login', userId: 'user123' })
 */
export function logEvent(eventName: string, data: Record<string, any> = {}): void {
  logger.info({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...data
  });
}

/**
 * Log de erro
 */
export function logError(eventName: string, error: Error, data: Record<string, any> = {}): void {
  logger.error({
    event: eventName,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    timestamp: new Date().toISOString(),
    ...data
  });
}

/**
 * Log de warning
 */
export function logWarn(eventName: string, data: Record<string, any> = {}): void {
  logger.warn({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...data
  });
}

export { logger, httpLogger };

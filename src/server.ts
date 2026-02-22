/**
 * Servidor principal do RiddleZinho
 * Jogo interativo de charadas
 *
 * Arquitetura: MVC com separação de concerns
 * - Router: src/routes/
 * - Controller: src/controllers/
 * - Config: src/config/
 * - Middleware: src/middleware/
 */

import express, { Application, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

// Importar configurações
import phases from './config/phases';

// Importar controllers
import PhaseController from './controllers/PhaseController';

// Importar routes
import createHomeRouter from './routes/home';
import createPhasesRouter from './routes/phases';
import createTipsRouter from './routes/tips';

// Importar middleware
import { getSecurityMiddleware, getLoggingMiddleware } from './middleware/security';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';
import { generalLimiter, apiLimiter } from './middleware/rateLimit';
import { httpLogger, addRequestMetadata } from './utils/logger';

// Importar routers adicionais
import createAuthRouter from './routes/auth';

// Inicializar aplicação
const app: Application = express();
const port: number | string = process.env.PORT || 5000;

// ============ CONFIGURAÇÃO GERAL ============

// Template engine
// __dirname aponta para dist/ quando compilado, então views está em ../views/
const viewsDir = path.join(__dirname, '../views');
const publicDir = path.join(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', viewsDir);
app.set('trust proxy', 1);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============ MIDDLEWARES DE LOGGING E RASTREAMENTO ============
app.use(httpLogger);
app.use(addRequestMetadata);
app.use(getLoggingMiddleware());

// ============ MIDDLEWARES DE SEGURANÇA ============
app.use(...getSecurityMiddleware());

// ============ RATE LIMITING ============
app.use(generalLimiter); // Rate limit geral

// ============ ARQUIVOS ESTÁTICOS ============
app.use(express.static(publicDir, {
  maxAge: '30d',
  etag: false
}));

// ============ CARREGAMENTO DE TEMPLATES ============
// Pré-carregar footers para melhor performance
const footerPasscode: string = fs.readFileSync(path.join(viewsDir, 'footerpasscode.ejs'), 'utf8');
const footerBack: string = fs.readFileSync(path.join(viewsDir, 'footerback.ejs'), 'utf8');

// Disponibilizar footers em res.locals
app.use((req: Request, res: Response, next) => {
  res.locals.footerpasscode = footerPasscode;
  res.locals.footerback = footerBack;
  next();
});

// ============ INICIALIZAR CONTROLLER ============
const phaseController = new PhaseController(phases, footerPasscode, footerBack);

// ============ REGISTRAR ROTAS ============

// Rotas principais (home, jogo)
app.use('/', createHomeRouter(phaseController));

// Rotas de fases
app.use('/fase', createPhasesRouter(phaseController, phases));

// Rotas legadas (compatibilidade)
// Redirecionar URLs antigas para novo formato
const legacyPhaseIds = Object.keys(phases);
legacyPhaseIds.forEach((phaseId: string) => {
  app.get(`/${phaseId}`, (req: Request, res: Response, next) => {
    req.params.phaseId = phaseId;
    phaseController.renderPhase(req, res, next);
  });
});

// Rotas de dicas (tips)
app.use('/dica', createTipsRouter(phaseController));

// ============ ROTAS DE AUTENTICAÇÃO E LEADERBOARD ============
app.use('/auth', apiLimiter, createAuthRouter());

// ============ HEALTH CHECK ============
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============ MANIPULADORES DE ERRO ============
app.use(notFoundHandler);
app.use(errorHandler);

// ============ INICIAR SERVIDOR ============
const server = app.listen(port, () => {
  console.log(`🎮 RiddleZinho Server rodando em http://localhost:${port}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Segurança: Helmet + Compression ativados`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando gracefully...');
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
});

export default app;

/**
 * Router de Autenticação e Leaderboard
 */

import { Router, Request, Response } from 'express';

import AuthController from '../controllers/AuthController';
import { loginLimiter } from '../middleware/rateLimit';
import { authenticate } from '../utils/auth';

export function createAuthRouter(): Router {
  const router = Router();

  /**
   * POST /auth/register
   * Registrar novo usuário
   */
  router.post('/register', loginLimiter, (req: Request, res: Response) => {
    AuthController.register(req, res);
  });

  /**
   * POST /auth/login
   * Login do usuário
   */
  router.post('/login', loginLimiter, (req: Request, res: Response) => {
    AuthController.login(req, res);
  });

  /**
   * GET /auth/profile
   * Obter perfil do usuário autenticado
   */
  router.get('/profile', authenticate, (req: Request, res: Response) => {
    AuthController.getProfile(req as any, res);
  });

  /**
   * PUT /auth/profile
   * Atualizar perfil do usuário
   */
  router.put('/profile', authenticate, (req: Request, res: Response) => {
    AuthController.updateProfile(req as any, res);
  });

  /**
   * POST /auth/complete-phase
   * Registrar conclusão de fase
   */
  router.post('/complete-phase', authenticate, (req: Request, res: Response) => {
    AuthController.completePhase(req as any, res);
  });

  /**
   * GET /auth/leaderboard
   * Obter leaderboard global
   */
  router.get('/leaderboard', (req: Request, res: Response) => {
    AuthController.getLeaderboard(req, res);
  });

  /**
   * GET /auth/leaderboard/me
   * Obter leaderboard com ranking do usuário
   */
  router.get('/leaderboard/me', authenticate, (req: Request, res: Response) => {
    AuthController.getLeaderboardWithUserRank(req as any, res);
  });

  return router;
}

export default createAuthRouter;
export { createAuthRouter as createAuthRouterFn };

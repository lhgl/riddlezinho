/**
 * Router de Autenticação e Leaderboard
 */

import { Router, Request, Response } from 'express';

import AuthController from '../controllers/AuthController';
import { loginLimiter } from '../middleware/rateLimit';
import { authenticate } from '../utils/auth';

export function createAuthRouter(): Router {
  const router = Router();

  router.post('/register', loginLimiter, (req: Request, res: Response) => {
    AuthController.register(req, res);
  });

  router.post('/login', loginLimiter, (req: Request, res: Response) => {
    AuthController.login(req, res);
  });

  router.get('/profile', authenticate, (req: Request, res: Response) => {
    AuthController.getProfile(req, res);
  });

  router.put('/profile', authenticate, (req: Request, res: Response) => {
    AuthController.updateProfile(req, res);
  });

  router.post('/complete-phase', authenticate, (req: Request, res: Response) => {
    AuthController.completePhase(req, res);
  });

  router.get('/leaderboard', (req: Request, res: Response) => {
    AuthController.getLeaderboard(req, res);
  });

  router.get('/leaderboard/me', authenticate, (req: Request, res: Response) => {
    AuthController.getLeaderboardWithUserRank(req, res);
  });

  return router;
}

export default createAuthRouter;
export { createAuthRouter as createAuthRouterFn };

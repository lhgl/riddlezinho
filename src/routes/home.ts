/**
 * Router para rotas principais do jogo
 */

import { Router, Request, Response } from 'express';
import PhaseController from '../controllers/PhaseController';

/**
 * Factory para criar router principal
 */
export function createHomeRouter(controller: PhaseController): Router {
  const router = Router();

  // Página inicial
  router.get('/', (req: Request, res: Response) => {
    controller.renderIndex(req, res);
  });

  // Página de jogo
  router.get('/jogar', (req: Request, res: Response) => {
    controller.renderGame(req, res);
  });

  // Página de login
  router.get('/login', (req: Request, res: Response) => {
    res.render('login');
  });

  // Página de leaderboard
  router.get('/leaderboard', (req: Request, res: Response) => {
    res.render('leaderboard');
  });

  return router;
}

export default createHomeRouter;
export { createHomeRouter as createHomeRouterFn };

/**
 * Router para dicas e material educativo
 */

import { Router, Request, Response, NextFunction } from 'express';
import PhaseController from '../controllers/PhaseController';

/**
 * Factory para criar router de dicas
 */
export function createTipsRouter(controller: PhaseController): Router {
  const router = Router();

  // Rota genérica para qualquer dica
  router.get('/:tipId', (req: Request, res: Response, next: NextFunction) => {
    controller.renderTip(req, res, next);
  });

  return router;
}

export default createTipsRouter;
export { createTipsRouter as createTipsRouterFn };

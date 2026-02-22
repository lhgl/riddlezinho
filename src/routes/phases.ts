/**
 * Router para fases do jogo
 */

import { Router, Request, Response, NextFunction } from 'express';

import { Phases } from '../config/phases';
import PhaseController from '../controllers/PhaseController';

/**
 * Factory para criar router de fases
 */
export function createPhasesRouter(controller: PhaseController, _phases: Phases): Router {
  const router = Router();

  // Rota genérica para qualquer fase
  router.get('/:phaseId', (req: Request, res: Response, next: NextFunction) => {
    controller.renderPhase(req, res, next);
  });

  // API endpoints
  router.get('/api/list', (req: Request, res: Response) => {
    controller.getPhasesList(req, res);
  });

  router.get('/api/phase/:phaseId', (req: Request, res: Response) => {
    controller.getPhaseData(req, res);
  });

  return router;
}

export default createPhasesRouter;
export { createPhasesRouter as createPhasesRouterFn };

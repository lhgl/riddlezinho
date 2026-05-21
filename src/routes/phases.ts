/**
 * Router para fases do jogo
 */

import { Router, Request, Response, NextFunction } from 'express';

import { Phases } from '../config/phases';
import PhaseController from '../controllers/PhaseController';

/**
 * Factory para criar router de fases
 * Nota: API routes devem ser registradas ANTES da rota dinâmica /:phaseId
 */
export function createPhasesRouter(controller: PhaseController, _phases: Phases): Router {
  const router = Router();

  // API endpoints — registrar antes de /:phaseId para evitar shadowing
  router.get('/api/list', (req: Request, res: Response) => {
    controller.getPhasesList(req, res);
  });

  router.get('/api/phase/:phaseId', (req: Request, res: Response) => {
    controller.getPhaseData(req, res);
  });

  // Rota genérica para qualquer fase (deve ser a última)
  router.get('/:phaseId', (req: Request, res: Response, next: NextFunction) => {
    controller.renderPhase(req, res, next);
  });

  return router;
}

export default createPhasesRouter;
export { createPhasesRouter as createPhasesRouterFn };

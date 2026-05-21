import { Router, Request, Response } from 'express';
import { AchievementController } from '../controllers/AchievementController';
import { AchievementService } from '../services/AchievementService';
import { DailyChallengeService } from '../services/DailyChallengeService';
import { RepositoryFactory } from '../repositories/RepositoryFactory';
import { authenticate } from '../utils/auth';
import phases from '../config/phases';

const achievementController = new AchievementController(
  new AchievementService(RepositoryFactory.createAchievementRepository()),
  new DailyChallengeService(phases)
);

export function createAchievementsRouter(): Router {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    achievementController.getAll(req, res);
  });

  router.get('/me', authenticate, (req: Request, res: Response) => {
    achievementController.getMyAchievements(req, res);
  });

  router.get('/daily', (req: Request, res: Response) => {
    achievementController.getDaily(req, res);
  });

  return router;
}

export default createAchievementsRouter;

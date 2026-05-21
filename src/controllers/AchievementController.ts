import { Request, Response } from 'express';
import { AchievementService } from '../services/AchievementService';
import { DailyChallengeService } from '../services/DailyChallengeService';
import { logError } from '../utils/logger';

export class AchievementController {
  constructor(
    private readonly achievementService: AchievementService,
    private readonly dailyChallengeService: DailyChallengeService
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = this.achievementService.getAllAchievements();
      const userAchievements = req.userId
        ? this.achievementService.getUserAchievements(req.userId)
        : [];
      const earnedKeys = new Set(userAchievements.map(a => a.key));
      res.json({
        achievements: all.map(a => ({ ...a, earned: earnedKeys.has(a.key) }))
      });
    } catch (error) {
      logError('get_achievements_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter conquistas' });
    }
  }

  async getMyAchievements(req: Request, res: Response): Promise<void> {
    try {
      const achievements = this.achievementService.getUserAchievements(req.userId!);
      res.json({ achievements });
    } catch (error) {
      logError('get_my_achievements_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter conquistas' });
    }
  }

  getDaily(req: Request, res: Response): void {
    try {
      const phase = this.dailyChallengeService.getDailyPhase();
      res.render('daily', { phase, title: 'Desafio do Dia' });
    } catch (error) {
      logError('get_daily_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter desafio do dia' });
    }
  }
}

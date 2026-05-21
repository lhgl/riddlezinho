/**
 * AuthController — gerencia autenticação e leaderboard via HTTP
 * Delega lógica de negócio: auth → utils/auth, leaderboard → LeaderboardService
 */

import { Request, Response } from 'express';

import { InMemoryLeaderboardRepository } from '../repositories/InMemoryLeaderboardRepository';
import { LeaderboardService } from '../services/LeaderboardService';
import * as auth from '../utils/auth';
import { logEvent, logError } from '../utils/logger';

// Re-exportar para compatibilidade com testes existentes
export type { UserScore } from '../repositories/interfaces';

// Instâncias singleton
const leaderboardRepository = new InMemoryLeaderboardRepository();
const leaderboardService = new LeaderboardService(leaderboardRepository);

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, passwordConfirm } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email e password são obrigatórios' });
        return;
      }

      if (password !== passwordConfirm) {
        res.status(400).json({ error: 'Senhas não conferem' });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
        return;
      }

      const user = await auth.register(username, email, password);
      leaderboardService.initUser(user.id, user.username);

      logEvent('user_registration_success', { userId: user.id, username });

      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
      logError('user_registration_failed', error as Error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username e password são obrigatórios' });
        return;
      }

      const result = await auth.login(username, password);
      logEvent('user_login_success', { userId: result.user.id, username });

      res.json({ message: 'Login realizado com sucesso', user: result.user, token: result.token });
    } catch (error) {
      logError('user_login_failed', error as Error);
      res.status(401).json({ error: (error as Error).message });
    }
  }

  getProfile(req: Request, res: Response): void {
    try {
      const user = auth.getUser(req.userId!);

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      const userScore = leaderboardService.getUserStats(req.userId!);

      res.json({ user: { ...user, stats: userScore || {} } });
    } catch (error) {
      logError('get_profile_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao obter perfil' });
    }
  }

  updateProfile(req: Request, res: Response): void {
    try {
      const { preferences } = req.body;
      const user = auth.updateUserProfile(req.userId!, { preferences });

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      logEvent('user_profile_updated', { userId: req.userId, changes: Object.keys(req.body) });
      res.json({ message: 'Perfil atualizado com sucesso', user });
    } catch (error) {
      logError('update_profile_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }

  completePhase(req: Request, res: Response): void {
    try {
      const { phaseId, timeSpent, score } = req.body;

      if (!phaseId || timeSpent === undefined || score === undefined) {
        res.status(400).json({ error: 'phaseId, timeSpent e score são obrigatórios' });
        return;
      }

      const user = auth.getUser(req.userId!);
      const username = user?.username || 'Anonymous';
      const stats = leaderboardService.completePhase(req.userId!, username, phaseId, score, timeSpent);

      res.json({ message: 'Fase concluída com sucesso', stats });
    } catch (error) {
      logError('complete_phase_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao registrar conclusão' });
    }
  }

  getLeaderboard(req: Request, res: Response): void {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const page = parseInt(req.query.page as string) || 1;
      const result = leaderboardService.getLeaderboard(page, limit);
      res.json(result);
    } catch (error) {
      logError('get_leaderboard_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter leaderboard' });
    }
  }

  getLeaderboardWithUserRank(req: Request, res: Response): void {
    try {
      const result = leaderboardService.getLeaderboardWithUserRank(req.userId!);
      res.json(result);
    } catch (error) {
      logError('get_leaderboard_user_rank_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter leaderboard' });
    }
  }
}

const authController = new AuthController();
export default authController;
export { AuthController as AuthControllerClass };

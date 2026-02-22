/**
 * AuthController - Gerencia autenticação e leaderboard
 */

import { Request, Response } from 'express';

import * as auth from '../utils/auth';
import { logEvent, logError } from '../utils/logger';

export interface UserScore {
  userId: string;
  username: string;
  score: number;
  completedPhases: number;
  level: number;
  timeSpent: number;
  lastUpdate: Date;
  completedPhasesList?: string[];
}

// Simular banco de dados de scores (em produção, usar DB real)
const leaderboard = new Map<string, UserScore>();

export class AuthController {
  /**
   * Registrar novo usuário
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, passwordConfirm } = req.body;

      // Validação básica
      if (!username || !email || !password) {
        res.status(400).json({
          error: 'Username, email e password são obrigatórios'
        });
        return;
      }

      if (password !== passwordConfirm) {
        res.status(400).json({
          error: 'Senhas não conferem'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          error: 'Senha deve ter no mínimo 6 caracteres'
        });
        return;
      }

      const user = await auth.register(username, email, password);

      // Inicializar score no leaderboard
      leaderboard.set(user.id, {
        userId: user.id,
        username: user.username,
        score: 0,
        completedPhases: 0,
        level: 0,
        timeSpent: 0,
        lastUpdate: new Date()
      });

      logEvent('user_registration_success', {
        userId: user.id,
        username
      });

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user
      });
    } catch (error) {
      logError('user_registration_failed', error as Error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Login de usuário
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({
          error: 'Username e password são obrigatórios'
        });
        return;
      }

      const result = await auth.login(username, password);

      logEvent('user_login_success', {
        userId: result.user.id,
        username
      });

      res.json({
        message: 'Login realizado com sucesso',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      logError('user_login_failed', error as Error);
      res.status(401).json({ error: (error as Error).message });
    }
  }

  /**
   * Obter perfil do usuário autenticado
   */
  getProfile(req: any, res: Response): void {
    try {
      const user = auth.getUser(req.userId);

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      // Obter score do leaderboard
      const userScore = leaderboard.get(req.userId) || {};

      res.json({
        user: {
          ...user,
          stats: userScore
        }
      });
    } catch (error) {
      logError('get_profile_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao obter perfil' });
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  updateProfile(req: any, res: Response): void {
    try {
      const { preferences } = req.body;

      const user = auth.updateUserProfile(req.userId, { preferences });

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      logEvent('user_profile_updated', {
        userId: req.userId,
        changes: Object.keys(req.body)
      });

      res.json({
        message: 'Perfil atualizado com sucesso',
        user
      });
    } catch (error) {
      logError('update_profile_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }

  /**
   * Registrar conclusão de fase
   */
  completePhase(req: any, res: Response): void {
    try {
      const { phaseId, timeSpent, score } = req.body;

      if (!phaseId || timeSpent === undefined || score === undefined) {
        res.status(400).json({
          error: 'phaseId, timeSpent e score são obrigatórios'
        });
        return;
      }

      // Obter ou criar score do usuário
      const userScore: UserScore = leaderboard.get(req.userId) || {
        userId: req.userId,
        username: auth.getUser(req.userId)?.username || 'Anonymous',
        score: 0,
        completedPhases: 0,
        level: 0,
        timeSpent: 0,
        completedPhasesList: [] as string[],
        lastUpdate: new Date()
      };

      // Evitar contar a mesma fase duas vezes
      if (!userScore.completedPhasesList) {
        userScore.completedPhasesList = [];
      }

      if (!userScore.completedPhasesList.includes(phaseId)) {
        userScore.score += score;
        userScore.completedPhases += 1;
        userScore.completedPhasesList = [...userScore.completedPhasesList, phaseId];

        // Atualizar nível (a cada 10 fases)
        userScore.level = Math.floor(userScore.completedPhases / 10);
      }

      userScore.timeSpent += timeSpent;
      userScore.lastUpdate = new Date();

      leaderboard.set(req.userId, userScore);

      logEvent('phase_completed', {
        userId: req.userId,
        phaseId,
        score,
        totalScore: userScore.score,
        totalPhases: userScore.completedPhases
      });

      res.json({
        message: 'Fase concluída com sucesso',
        stats: userScore
      });
    } catch (error) {
      logError('complete_phase_failed', error as Error, { userId: req.userId });
      res.status(500).json({ error: 'Erro ao registrar conclusão' });
    }
  }

  /**
   * Obter leaderboard global
   */
  getLeaderboard(req: Request, res: Response): void {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const page = parseInt(req.query.page as string) || 1;

      // Ordenar por score decrescente
      const sorted = Array.from(leaderboard.values())
        .sort((a, b) => b.score - a.score);

      const total = sorted.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = sorted.slice(start, end);

      // Adicionar ranking
      const withRank = items.map((item, index) => ({
        ...item,
        rank: start + index + 1
      }));

      res.json({
        leaderboard: withRank,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      logError('get_leaderboard_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter leaderboard' });
    }
  }

  /**
   * Obter leaderboard do usuário (top 10 + usuário)
   */
  getLeaderboardWithUserRank(req: any, res: Response): void {
    try {
      const limit = 10;

      // Ordenar por score
      const sorted = Array.from(leaderboard.values())
        .sort((a, b) => b.score - a.score);

      // Top 10
      const top10 = sorted.slice(0, limit).map((item, index) => ({
        ...item,
        rank: index + 1
      }));

      // Encontrar posição do usuário
      const userRank = sorted.findIndex(item => item.userId === req.userId) + 1;
      const userStats = leaderboard.get(req.userId);

      res.json({
        leaderboard: top10,
        userRank: userRank || null,
        userStats: userStats || null
      });
    } catch (error) {
      logError('get_leaderboard_user_rank_failed', error as Error);
      res.status(500).json({ error: 'Erro ao obter leaderboard' });
    }
  }
}

// Exportar instância única para uso nas rotas
const authController = new AuthController();

// Exportação para compatibilidade com CommonJS/Jest
export default authController;
export { AuthController as AuthControllerClass };

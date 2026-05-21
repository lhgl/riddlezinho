/**
 * LeaderboardService — lógica de negócio do placar
 * Controllers delegam para este serviço; ele não conhece HTTP
 */

import { ILeaderboardRepository, UserScore } from '../repositories/interfaces';
import { logEvent } from '../utils/logger';

export interface LeaderboardEntry extends UserScore {
  rank: number;
}

export interface LeaderboardPage {
  leaderboard: LeaderboardEntry[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface LeaderboardWithUserRank {
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
  userStats: UserScore | null;
}

export class LeaderboardService {
  constructor(private readonly repo: ILeaderboardRepository) {}

  async initUser(userId: string, username: string): Promise<void> {
    if (!(await this.repo.findByUserId(userId))) {
      await this.repo.save({
        userId,
        username,
        score: 0,
        completedPhases: 0,
        level: 0,
        timeSpent: 0,
        lastUpdate: new Date(),
        completedPhasesList: []
      });
    }
  }

  async completePhase(
    userId: string,
    username: string,
    phaseId: string,
    score: number,
    timeSpent: number
  ): Promise<UserScore> {
    const existing = await this.repo.findByUserId(userId);
    const userScore: UserScore = existing ?? {
      userId,
      username,
      score: 0,
      completedPhases: 0,
      level: 0,
      timeSpent: 0,
      lastUpdate: new Date(),
      completedPhasesList: []
    };

    if (!userScore.completedPhasesList.includes(phaseId)) {
      userScore.score += score;
      userScore.completedPhases += 1;
      userScore.completedPhasesList = [...userScore.completedPhasesList, phaseId];
      userScore.level = Math.floor(userScore.completedPhases / 10);
    }

    userScore.timeSpent += timeSpent;
    userScore.lastUpdate = new Date();
    await this.repo.save(userScore);

    logEvent('phase_completed', {
      userId,
      phaseId,
      score,
      totalScore: userScore.score,
      totalPhases: userScore.completedPhases
    });

    return userScore;
  }

  async getLeaderboard(page: number, limit: number): Promise<LeaderboardPage> {
    const all = await this.repo.findAll();
    const sorted = all.sort((a, b) => b.score - a.score);
    const total = sorted.length;
    const start = (page - 1) * limit;
    const items = sorted.slice(start, start + limit);

    return {
      leaderboard: items.map((item, i) => ({ ...item, rank: start + i + 1 })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getLeaderboardWithUserRank(userId: string): Promise<LeaderboardWithUserRank> {
    const all = await this.repo.findAll();
    const sorted = all.sort((a, b) => b.score - a.score);
    const top10 = sorted.slice(0, 10).map((item, i) => ({ ...item, rank: i + 1 }));
    const rankIndex = sorted.findIndex(item => item.userId === userId);

    return {
      leaderboard: top10,
      userRank: rankIndex >= 0 ? rankIndex + 1 : null,
      userStats: (await this.repo.findByUserId(userId)) ?? null
    };
  }

  async getUserStats(userId: string): Promise<UserScore | null> {
    return (await this.repo.findByUserId(userId)) ?? null;
  }
}

import { PrismaClient } from '@prisma/client';

import { ILeaderboardRepository, UserScore } from './interfaces';

export class PrismaLeaderboardRepository implements ILeaderboardRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<UserScore | undefined> {
    const row = await this.prisma.userScore.findUnique({ where: { userId } });
    return row ? this.toUserScore(row) : undefined;
  }

  async save(score: UserScore): Promise<void> {
    await this.prisma.userScore.upsert({
      where: { userId: score.userId },
      create: {
        userId: score.userId,
        username: score.username,
        score: score.score,
        completedPhases: score.completedPhases,
        level: score.level,
        timeSpent: score.timeSpent,
        lastUpdate: score.lastUpdate,
        completedPhasesList: score.completedPhasesList
      },
      update: {
        username: score.username,
        score: score.score,
        completedPhases: score.completedPhases,
        level: score.level,
        timeSpent: score.timeSpent,
        lastUpdate: score.lastUpdate,
        completedPhasesList: score.completedPhasesList
      }
    });
  }

  async findAll(): Promise<UserScore[]> {
    const rows = await this.prisma.userScore.findMany();
    return rows.map(r => this.toUserScore(r));
  }

  clear(): void {
    // No-op in production — clear() is only used in tests with InMemory repo
  }

  private toUserScore(row: {
    userId: string;
    username: string;
    score: number;
    completedPhases: number;
    level: number;
    timeSpent: number;
    lastUpdate: Date;
    completedPhasesList: string[];
  }): UserScore {
    return {
      userId: row.userId,
      username: row.username,
      score: row.score,
      completedPhases: row.completedPhases,
      level: row.level,
      timeSpent: row.timeSpent,
      lastUpdate: row.lastUpdate,
      completedPhasesList: row.completedPhasesList
    };
  }
}

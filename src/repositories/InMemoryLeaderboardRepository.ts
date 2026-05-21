/**
 * Implementação in-memory do repositório de leaderboard
 * Em produção, substituir por implementação com banco de dados real
 */

import { ILeaderboardRepository, UserScore } from './interfaces';

export class InMemoryLeaderboardRepository implements ILeaderboardRepository {
  private readonly store = new Map<string, UserScore>();

  findByUserId(userId: string): UserScore | undefined {
    return this.store.get(userId);
  }

  save(score: UserScore): void {
    this.store.set(score.userId, score);
  }

  findAll(): UserScore[] {
    return Array.from(this.store.values());
  }

  clear(): void {
    this.store.clear();
  }
}

/**
 * Implementação in-memory do repositório de leaderboard
 * Em produção, substituir por implementação com banco de dados real
 */

import { ILeaderboardRepository, UserScore } from './interfaces';

export class InMemoryLeaderboardRepository implements ILeaderboardRepository {
  private readonly store = new Map<string, UserScore>();

  async findByUserId(userId: string): Promise<UserScore | undefined> {
    return this.store.get(userId);
  }

  async save(score: UserScore): Promise<void> {
    this.store.set(score.userId, score);
  }

  async findAll(): Promise<UserScore[]> {
    return Array.from(this.store.values());
  }

  clear(): void {
    this.store.clear();
  }
}

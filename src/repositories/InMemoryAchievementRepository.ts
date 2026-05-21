export class InMemoryAchievementRepository {
  private readonly store = new Map<string, Set<string>>();

  getUserAchievementKeys(userId: string): string[] {
    return Array.from(this.store.get(userId) ?? new Set());
  }

  grant(userId: string, achievementKey: string): void {
    if (!this.store.has(userId)) {
      this.store.set(userId, new Set());
    }
    this.store.get(userId)!.add(achievementKey);
  }

  has(userId: string, achievementKey: string): boolean {
    return this.store.get(userId)?.has(achievementKey) ?? false;
  }

  clear(): void {
    this.store.clear();
  }
}

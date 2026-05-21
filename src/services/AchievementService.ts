import { InMemoryAchievementRepository } from '../repositories/InMemoryAchievementRepository';

export interface Achievement {
  key: string;
  name: string;
  threshold: number;
  icon: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { key: 'iniciante', name: 'Iniciante',  threshold: 1,  icon: '🌱', description: 'Completou a primeira fase' },
  { key: 'aprendiz',  name: 'Aprendiz',   threshold: 10, icon: '📚', description: 'Completou 10 fases' },
  { key: 'veterano',  name: 'Veterano',   threshold: 25, icon: '⚔️',  description: 'Completou 25 fases' },
  { key: 'mestre',    name: 'Mestre',     threshold: 50, icon: '👑', description: 'Completou 50 fases' },
  { key: 'lenda',     name: 'LENDA',      threshold: 99, icon: '🏆', description: 'Completou todas as 99 fases' },
];

export class AchievementService {
  constructor(private readonly repo: InMemoryAchievementRepository) {}

  checkAndGrant(userId: string, completedCount: number): Achievement[] {
    const newlyEarned: Achievement[] = [];
    for (const achievement of ACHIEVEMENTS) {
      if (completedCount >= achievement.threshold && !this.repo.has(userId, achievement.key)) {
        this.repo.grant(userId, achievement.key);
        newlyEarned.push(achievement);
      }
    }
    return newlyEarned;
  }

  getUserAchievements(userId: string): Achievement[] {
    const keys = this.repo.getUserAchievementKeys(userId);
    return ACHIEVEMENTS.filter(a => keys.includes(a.key));
  }

  getAllAchievements(): Achievement[] {
    return [...ACHIEVEMENTS];
  }
}

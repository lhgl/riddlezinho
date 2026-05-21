import { ILeaderboardRepository, IUserRepository } from './interfaces';
import { InMemoryLeaderboardRepository } from './InMemoryLeaderboardRepository';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { InMemoryAchievementRepository } from './InMemoryAchievementRepository';
import { PrismaLeaderboardRepository } from './PrismaLeaderboardRepository';
import { PrismaUserRepository } from './PrismaUserRepository';

let achievementRepoInstance: InMemoryAchievementRepository | undefined;

let prismaInstance: import('@prisma/client').PrismaClient | undefined;

function getPrisma(): import('@prisma/client').PrismaClient {
  if (!prismaInstance) {
    // Lazy import to avoid runtime error when no DATABASE_URL is set
    const { PrismaClient } = require('@prisma/client') as typeof import('@prisma/client');
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

export class RepositoryFactory {
  static createUserRepository(): IUserRepository {
    if (process.env.DATABASE_URL) {
      return new PrismaUserRepository(getPrisma());
    }
    return new InMemoryUserRepository();
  }

  static createLeaderboardRepository(): ILeaderboardRepository {
    if (process.env.DATABASE_URL) {
      return new PrismaLeaderboardRepository(getPrisma());
    }
    return new InMemoryLeaderboardRepository();
  }

  static createAchievementRepository(): InMemoryAchievementRepository {
    if (!achievementRepoInstance) {
      achievementRepoInstance = new InMemoryAchievementRepository();
    }
    return achievementRepoInstance;
  }

  static async disconnect(): Promise<void> {
    if (prismaInstance) {
      await prismaInstance.$disconnect();
      prismaInstance = undefined;
    }
  }
}

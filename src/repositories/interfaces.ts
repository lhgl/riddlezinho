/**
 * Contratos de repositório — permite trocar a persistência sem alterar serviços
 */

import { User } from '../utils/auth';

export interface UserScore {
  userId: string;
  username: string;
  score: number;
  completedPhases: number;
  level: number;
  timeSpent: number;
  lastUpdate: Date;
  completedPhasesList: string[];
}

export interface IUserRepository {
  findById(id: string): User | undefined;
  findByUsername(username: string): User | undefined;
  findByEmail(email: string): User | undefined;
  findByUsernameOrEmail(username: string, email: string): User | undefined;
  save(user: User): void;
  update(id: string, updates: Partial<User>): User | undefined;
}

export interface ILeaderboardRepository {
  findByUserId(userId: string): UserScore | undefined;
  save(score: UserScore): void;
  findAll(): UserScore[];
}

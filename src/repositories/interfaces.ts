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
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsernameOrEmail(username: string, email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
  update(id: string, updates: Partial<User>): Promise<User | undefined>;
  clear(): void;
}

export interface ILeaderboardRepository {
  findByUserId(userId: string): Promise<UserScore | undefined>;
  save(score: UserScore): Promise<void>;
  findAll(): Promise<UserScore[]>;
  clear(): void;
}

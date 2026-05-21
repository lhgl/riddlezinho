/**
 * Implementação in-memory do repositório de usuários
 * Em produção, substituir por implementação com banco de dados real
 */

import { User } from '../utils/auth';

import { IUserRepository } from './interfaces';

export class InMemoryUserRepository implements IUserRepository {
  private readonly store = new Map<string, User>();

  findById(id: string): User | undefined {
    return this.store.get(id);
  }

  findByUsername(username: string): User | undefined {
    return Array.from(this.store.values()).find(u => u.username === username);
  }

  findByEmail(email: string): User | undefined {
    return Array.from(this.store.values()).find(u => u.email === email);
  }

  findByUsernameOrEmail(username: string, email: string): User | undefined {
    return Array.from(this.store.values()).find(
      u => u.username === username || u.email === email
    );
  }

  save(user: User): void {
    this.store.set(user.id, user);
  }

  update(id: string, updates: Partial<User>): User | undefined {
    const user = this.store.get(id);
    if (!user) {
      return undefined;
    }
    const updated = { ...user, ...updates };
    this.store.set(id, updated);
    return updated;
  }

  clear(): void {
    this.store.clear();
  }
}

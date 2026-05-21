/**
 * Implementação in-memory do repositório de usuários
 * Em produção, substituir por implementação com banco de dados real
 */

import { User } from '../utils/auth';

import { IUserRepository } from './interfaces';

export class InMemoryUserRepository implements IUserRepository {
  private readonly store = new Map<string, User>();

  async findById(id: string): Promise<User | undefined> {
    return this.store.get(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.store.values()).find(u => u.username === username);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.store.values()).find(u => u.email === email);
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<User | undefined> {
    return Array.from(this.store.values()).find(
      u => u.username === username || u.email === email
    );
  }

  async save(user: User): Promise<void> {
    this.store.set(user.id, user);
  }

  async update(id: string, updates: Partial<User>): Promise<User | undefined> {
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

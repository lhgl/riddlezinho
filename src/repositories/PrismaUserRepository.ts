import { PrismaClient, User as PrismaUser } from '@prisma/client';

import { User } from '../utils/auth';

import { IUserRepository } from './interfaces';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | undefined> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toUser(row) : undefined;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const row = await this.prisma.user.findUnique({ where: { username } });
    return row ? this.toUser(row) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? this.toUser(row) : undefined;
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<User | undefined> {
    const row = await this.prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });
    return row ? this.toUser(row) : undefined;
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        language: user.preferences.language,
        notifications: user.preferences.notifications
      }
    });
  }

  async update(id: string, updates: Partial<User>): Promise<User | undefined> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return undefined;
    }
    const data: Record<string, unknown> = {};
    if (updates.lastLogin !== undefined) { data.lastLogin = updates.lastLogin; }
    if (updates.preferences) {
      if (updates.preferences.language !== undefined) { data.language = updates.preferences.language; }
      if (updates.preferences.notifications !== undefined) { data.notifications = updates.preferences.notifications; }
    }
    const row = Object.keys(data).length > 0
      ? await this.prisma.user.update({ where: { id }, data })
      : existing;
    return this.toUser(row);
  }

  clear(): void {
    // No-op in production — clear() is only used in tests with InMemory repo
  }

  private toUser(row: PrismaUser): User {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      createdAt: row.createdAt,
      lastLogin: row.lastLogin,
      preferences: {
        language: row.language,
        notifications: row.notifications
      }
    };
  }
}

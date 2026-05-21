/**
 * AuthService — lógica de negócio de autenticação usando o padrão de repositório
 * Implementação standalone; controllers podem usar este serviço ou utils/auth diretamente
 */

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { ConflictError, AuthenticationError } from '../errors/AppError';
import { IUserRepository } from '../repositories/interfaces';
import { User, UserWithoutPassword, LoginResult, JWTPayload } from '../utils/auth';
import { logEvent, logWarn } from '../utils/logger';

const BCRYPT_ROUNDS = 10;

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpire: string;

  constructor(
    private readonly userRepo: IUserRepository,
    jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
    jwtExpire = process.env.JWT_EXPIRE || '24h'
  ) {
    this.jwtSecret = jwtSecret;
    this.jwtExpire = jwtExpire;
  }

  async register(username: string, email: string, password: string): Promise<UserWithoutPassword> {
    if (await this.userRepo.findByUsernameOrEmail(username, email)) {
      throw new ConflictError('Usuário ou email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user: User = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: null,
      preferences: { language: 'pt-BR', notifications: true }
    };

    await this.userRepo.save(user);
    logEvent('user_registered', { userId: user.id, username, email });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(username: string, password: string): Promise<LoginResult> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new AuthenticationError('Usuário ou senha inválidos');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logWarn('failed_login_attempt', { username, reason: 'invalid_password' });
      throw new AuthenticationError('Usuário ou senha inválidos');
    }

    const payload: JWTPayload = { userId: user.id, username: user.username, email: user.email };
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpire
    } as SignOptions);

    await this.userRepo.update(user.id, { lastLogin: new Date() });
    logEvent('user_login', { userId: user.id, username, timestamp: new Date().toISOString() });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as JWTPayload;
    } catch (error) {
      if ((error as Error).name === 'TokenExpiredError') {
        throw new AuthenticationError('Token expirado');
      }
      throw new AuthenticationError('Token inválido');
    }
  }

  async getUser(userId: string): Promise<UserWithoutPassword | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserProfile(
    userId: string,
    updates: { preferences?: Partial<User['preferences']> }
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      return null;
    }

    const updated = await this.userRepo.update(userId, {
      preferences: updates.preferences
        ? { ...user.preferences, ...updates.preferences }
        : user.preferences
    });

    if (!updated) {
      return null;
    }
    logEvent('user_profile_updated', { userId, updates: Object.keys(updates) });

    const { password: _, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
}

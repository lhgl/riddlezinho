/**
 * Autenticação com JWT
 * Suporta Login, Registro e Token Refresh
 */

import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { RepositoryFactory } from '../repositories/RepositoryFactory';
import { logEvent, logError, logWarn } from './logger';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
  preferences: {
    language: string;
    notifications: boolean;
  };
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface LoginResult {
  user: UserWithoutPassword;
  token: string;
}

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
}

// Repository singleton — InMemory when no DATABASE_URL, PostgreSQL otherwise
export const userRepo = RepositoryFactory.createUserRepository();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

/**
 * Registrar novo usuário
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<UserWithoutPassword> {
  try {
    const existingUser = await userRepo.findByUsernameOrEmail(username, email);

    if (existingUser) {
      throw new Error('Usuário ou email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const user: User = {
      id: userId,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: null,
      preferences: {
        language: 'pt-BR',
        notifications: true
      }
    };

    await userRepo.save(user);
    logEvent('user_registered', { userId, username, email });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    logError('user_registration_failed', error as Error, { username, email });
    throw error;
  }
}

/**
 * Login de usuário
 */
export async function login(username: string, password: string): Promise<LoginResult> {
  try {
    const user = await userRepo.findByUsername(username);

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      logWarn('failed_login_attempt', { username, reason: 'invalid_password' });
      throw new Error('Usuário ou senha inválidos');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email } as JWTPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE } as SignOptions
    );

    await userRepo.update(user.id, { lastLogin: new Date() });
    logEvent('user_login', { userId: user.id, username, timestamp: new Date().toISOString() });

    const { password: _, ...userWithoutPassword } = user;
    return { user: { ...userWithoutPassword, lastLogin: new Date() }, token };
  } catch (error) {
    logError('user_login_failed', error as Error, { username });
    throw error;
  }
}

/**
 * Verificar token JWT
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if ((error as Error).name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    }
    throw new Error('Token inválido');
  }
}

/**
 * Middleware de autenticação — extrai token Bearer e popula req.userId/req.user
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    logWarn('authentication_failed', {
      error: (error as Error).message,
      ip: req.ip
    });
    res.status(401).json({ error: (error as Error).message });
  }
}

/**
 * Obter usuário por ID
 */
export async function getUser(userId: string): Promise<UserWithoutPassword | null> {
  const user = await userRepo.findById(userId);
  if (!user) {
    return null;
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Atualizar perfil do usuário
 */
export async function updateUserProfile(
  userId: string,
  updates: { preferences?: Partial<User['preferences']> }
): Promise<UserWithoutPassword | null> {
  const user = await userRepo.findById(userId);
  if (!user) {
    return null;
  }

  const updatedUser = await userRepo.update(userId, {
    preferences: updates.preferences
      ? { ...user.preferences, ...updates.preferences }
      : user.preferences
  });

  if (!updatedUser) {
    return null;
  }

  logEvent('user_profile_updated', { userId, updates: Object.keys(updates) });

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}

/**
 * Autenticação com JWT
 * Suporta Login, Registro e Token Refresh
 */

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

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

// Simular banco de dados em memória (em produção, usar DB real)
export const users = new Map<string, User>();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
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
    // Verificar se usuário já existe
    const existingUser = Array.from(users.values()).find(
      u => u.username === username || u.email === email
    );

    if (existingUser) {
      throw new Error('Usuário ou email já existe');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
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

    users.set(userId, user);

    logEvent('user_registered', {
      userId,
      username,
      email
    });

    // Não retornar senha
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
    // Encontrar usuário
    const user = Array.from(users.values()).find(u => u.username === username);

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      logWarn('failed_login_attempt', {
        username,
        reason: 'invalid_password'
      });
      throw new Error('Usuário ou senha inválidos');
    }

    // Gerar token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email
      } as JWTPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE } as SignOptions
    );

    // Atualizar último login
    user.lastLogin = new Date();

    logEvent('user_login', {
      userId: user.id,
      username,
      timestamp: new Date().toISOString()
    });

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
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
 * Middleware de autenticação
 */
export function authenticate(req: any, res: any, next: () => void): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

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
export function getUser(userId: string): UserWithoutPassword | null {
  const user = users.get(userId);
  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Atualizar perfil do usuário
 */
export function updateUserProfile(
  userId: string,
  updates: { preferences?: Partial<User['preferences']> }
): UserWithoutPassword | null {
  const user = users.get(userId);
  if (!user) {
    return null;
  }

  // Permitir atualizar preferências
  if (updates.preferences) {
    user.preferences = { ...user.preferences, ...updates.preferences };
  }

  logEvent('user_profile_updated', {
    userId,
    updates: Object.keys(updates)
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

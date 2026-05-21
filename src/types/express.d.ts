import { JWTPayload } from '../utils/auth';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      requestId?: string;
      user?: JWTPayload;
    }
  }
}

export {};

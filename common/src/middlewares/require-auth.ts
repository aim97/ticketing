import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../errors/AuthenticationError'

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser) {
    return next();
  }

  throw new AuthenticationError();
}
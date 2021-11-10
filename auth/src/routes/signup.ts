import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/RequestValidationError';

const router = Router();

const checks = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]


const validationHandler = (req: Request, res:Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  throw new RequestValidationError(errors.array());
}


router.post(
  '/signup',
  checks,
  validationHandler,
  async (req:Request , res:Response) => {

  },
);

export { router as signupRouter };
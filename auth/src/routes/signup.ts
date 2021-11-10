import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { validationHandler } from '../middlewares/validation-handler';

const router = Router();

const checks = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

router.post(
  '/signup',
  checks,
  validationHandler,
  async (req:Request , res:Response) => {

  },
);

export { router as signupRouter };
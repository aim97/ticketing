import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { validationHandler } from '../middlewares/validation-handler';

import db from '../db';

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
    const { email, password } = req.body;

    const newUser = db.users.build({ email, password });
    await newUser.save();

    res.status(201).send(newUser);
  },
);

export { router as signupRouter };
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import db from '../db';

import { Password, Token, validationHandler, AuthenticationError } from '@demo-ticketing/common';

const router = Router();

const checks = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

router.post(
  '/login',
  checks,
  validationHandler,
  async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await db.users.findOne({ email });

    if (!user) {
      throw new AuthenticationError();
    }

    const isValid = await Password.compare(password, user.password);

    if (!isValid) {
      throw new AuthenticationError();
    }

    const token = Token.generateToken({ id: user.id, email: user.email });

    req.session = { jwt: token }; 

    res.status(httpStatus.OK).send(user);
  },
);

export { router as loginRouter };
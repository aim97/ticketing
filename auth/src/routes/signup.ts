import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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


const handleValidation = (req: Request, res:Response, next: Function) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    errors,
  });
}


router.get(
  '/signup',
  checks,
  handleValidation,
  async (req:Request , res:Response) => {

  },
);

export { router as signupRouter };
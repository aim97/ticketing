import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { requireAuth, validationHandler } from '@demo-ticketing/common';
import { body } from 'express-validator';
import { db } from '../db';

const router = Router();

const checks = [
  body('title')
    .notEmpty()
    .withMessage('Title can\'t be empty')
  ,
  body('price')
    .isFloat({ gt: 0})
    .withMessage('Price must be a number')
]

router.post(
  '/api/tickets/',
  requireAuth,
  checks,
  validationHandler,
  async (req: Request, res: Response) => {
    const ticket = db.Ticket.build({
      title: req.body.title,
      price: req.body.price,
      ownerId: req.currentUser!.id,
    });

    await ticket.save();

    res.status(httpStatus.CREATED).send(ticket);
  },
)

export { router as createTicketRouter }
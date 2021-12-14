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

router.patch(
  '/api/tickets/:id',
  requireAuth,
  checks,
  validationHandler,
  async (req: Request, res: Response) => {
    const ticketId = req.params.id!;

    const updates = req.body;
    if (!updates.id) delete updates.id;
    if (!updates.title) delete updates.title;
    console.log(updates);

    const ticket = await db.Ticket.updateOne(
      {
        id: ticketId,
        ownerId: req.currentUser?.id,
      },
      updates
    );

    res.status(httpStatus.CREATED).send(ticket);
  },
)

export { router as updateTicketRouter }
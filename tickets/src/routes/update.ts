import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { requireAuth, validationHandler, NotFoundError, RequestValidationError } from '@demo-ticketing/common';
import { body } from 'express-validator';
import { db } from '../db';

const router = Router();

const checks = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title can\'t be empty')
  ,
  body('price')
    .optional()
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

    const result = await db.Ticket.findOneAndUpdate(
      {
        id: ticketId,
        ownerId: req.currentUser?.id,
      },
      updates,
      {
        returnNewDocument: true,
      }
    );

    if (!result) {
      throw new NotFoundError('Ticket not found');
    }

    res.status(httpStatus.OK).send(result);
  },
)

export { router as updateTicketRouter }
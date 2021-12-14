import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { validationHandler, NotFoundError } from '@demo-ticketing/common';
import { db } from '../db';

const router = Router();

router.get(
  '/api/tickets/:id',
  validationHandler,
  async (req: Request, res: Response) => {
    const ticket = await db.Ticket.findById(req.params.id!);
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    res.status(httpStatus.OK).send(ticket);
  },
)

export { router as getTicketRouter }
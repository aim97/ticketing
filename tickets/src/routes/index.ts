import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { validationHandler, NotFoundError } from '@demo-ticketing/common';
import { db } from '../db';

const router = Router();

router.get(
  '/api/tickets',
  validationHandler,
  async (req: Request, res: Response) => {
    const tickets = await db.Ticket.find({});

    res.status(httpStatus.OK).send(tickets);
  },
)

export { router as getTicketsRouter }
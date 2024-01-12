import express from 'express';
import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserHandler, notFoundHandler, errorHandler } from '@demo-ticketing/common';

import { createTicketRouter } from './routes/new';
import { getTicketRouter } from './routes/show';
import { getTicketsRouter } from './routes/';
import { updateTicketRouter } from './routes/update';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}));
app.use(currentUserHandler);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all('*', notFoundHandler);
app.use(errorHandler);

export { app } ;
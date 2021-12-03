import App from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { loginRouter } from './routes/login';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { logoutRouter } from './routes/logout';

import { notFoundHandler, currentUserHandler, errorHandler } from '@demo-ticketing/common';

const app = App();
app.set('trust proxy', true); // trust ingress proxy (in dev env where we use a fake certificate)

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // only send cookies over https
  })
);

app.use(currentUserHandler);

app.use('/api/users', loginRouter);
app.use('/api/users', signupRouter);
app.use('/api/users', currentUserRouter);
app.use('/api/users', logoutRouter);

app.all('*', notFoundHandler);

app.use(errorHandler);

export { app };
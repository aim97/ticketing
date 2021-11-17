import App from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { loginRouter } from './routes/login';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { logoutRouter } from './routes/logout';

import db from './db';

import { notFoundHandler } from './middlewares/not-found-handler';
import { currentUserHandler } from './middlewares/current-user';

import errorHandler from './middlewares/error-handler';

const app = App();
app.set('trust proxy', true); // trust ingress proxy (in dev env where we use a fake certificate)

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true, // only send cookies over https
  })
);

app.use(currentUserHandler);

app.use('/api/users', loginRouter);
app.use('/api/users', signupRouter);
app.use('/api/users', currentUserRouter);
app.use('/api/users', logoutRouter);

app.all('*', notFoundHandler);

app.use(errorHandler);

const start = async () => {
  try {
    await db.connect();
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
};
    
start();

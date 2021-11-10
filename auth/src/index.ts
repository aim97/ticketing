import App from 'express';
import { json } from 'body-parser';

import { loginRouter } from './routes/login';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { logoutRouter } from './routes/logout';

import { notFoundHandler } from './middlewares/not-found-handler';

import errorHandler from './middlewares/error-handler';

const app = App();

app.use(json());

app.use('/api/users', loginRouter);
app.use('/api/users', signupRouter);
app.use('/api/users', currentUserRouter);
app.use('/api/users', logoutRouter);

app.all('*', notFoundHandler);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

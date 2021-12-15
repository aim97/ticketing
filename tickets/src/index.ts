import { app } from './app';
import { db } from './db';

const start = async () => {
  try {
    await db.connect();
    console.log('Connected to mongodb');
  } catch (e) {
    console.error(e);
  }

  app.listen(() => {
    console.log('Tickets server started on port 3000');
  });
};

start();
import { app } from './app';
import db from './db';

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

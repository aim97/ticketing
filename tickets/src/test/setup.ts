import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import faker from 'faker';

// before all
// 1. initialize env variables for testing
// 2. start mongoose connection to mongodb-memory-server
let memdb: MongoMemoryServer;
beforeAll(async () => {
  memdb = await MongoMemoryServer.create();
  
  process.env.MONGO_URI = memdb.getUri();
  process.env.JWT_KEY = faker.internet.password();
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  await mongoose.connect(process.env.MONGO_URI);
});

// before each suite
// 1. clear collections
beforeEach(async () => {
  const cols = await mongoose.connection.db.collections();
  cols.forEach((col) => {
    col.drop();
  })
});

// after all
// close connection
afterAll(async () => {
  await mongoose.disconnect()
  await memdb.stop();
})
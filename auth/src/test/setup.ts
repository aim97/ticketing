import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import faker from 'faker';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = faker.internet.password();

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  // drop all collections
  await mongoServer.stop();
  await mongoose.disconnect();
});
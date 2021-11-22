import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import faker from 'faker';

declare global {
  function getCookies(): Promise<string[]>;
  function createUser(): Promise<{email: string, password:string}>;
}

global.getCookies = async ():Promise<string[]> => {
  const response = await request(app).post('/api/users/signup').send({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).expect(201);

  return response.get('Set-Cookie');
};

global.createUser = async ():Promise<{email: string, password:string}> => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await request(app).post('/api/users/signup').send(user).expect(201);

  return user;
};

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = faker.internet.password();
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
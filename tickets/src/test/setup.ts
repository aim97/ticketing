import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import faker from 'faker';
import request from 'supertest'
import { Token } from '@demo-ticketing/common';

import { app } from '../app';

declare global {
  function getCookies(): string[];
  function createTicket(): Promise<{id: string, title: string, price: number, ownerId: string}>;
};

global.getCookies = () => {
  const user = {
    email: faker.internet.email(),
    id: mongoose.Types.ObjectId.generate().toString('hex')
  };
  const token = Token.generateToken(user);

  const cookie = { jwt: token};

  const cookieJSON = JSON.stringify(cookie);

  const base64 = Buffer.from(cookieJSON).toString('base64');

  const cookieHeader = [
    `express:sess=${base64}`
  ];

  return cookieHeader;
};

global.createTicket = async () => {
  const res = await request(app)
    .post('/api/tickets')
    .send({
      title: faker.lorem.word(10),
      price: faker.datatype.float({min: 0, precision: 0.01}) //* the max is -1 so the price is always negative
    })
    .set('Cookie', global.getCookies())
    .expect(201);

  const ticket = res.body as {id: string, title: string, price: number, ownerId: string};
  return ticket;
};

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
  cols.forEach(async (col) => {
    await col.deleteMany({});
  })
});

// after all
// close connection
afterAll(async () => {
  await mongoose.disconnect()
  await memdb.stop();
})
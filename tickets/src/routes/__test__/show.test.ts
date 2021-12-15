import request from 'supertest';
import faker from 'faker';
import mongoose from 'mongoose';

import { app } from '../../app';

it('doesn\'t require authentication', async () => {
  const res = await request(app)
    .get(`/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}`);
  expect(res.status).not.toBe(401);
});

it('returns 404 when ticket is not found', () => request(app)
  .get(`/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}`)
  .expect(404)
);

it('returns the data of the requested ticket', async () => {
  const ticket = await global.createTicket();
  const res = await request(app).get(`/api/tickets/${ticket.id}`);
  expect(res.status).toBe(200);
});
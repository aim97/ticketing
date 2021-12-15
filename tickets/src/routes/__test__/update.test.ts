import request from 'supertest';
import faker from 'faker';
import { app } from '../../app';
import mongoose from 'mongoose';

it('has a route at PATCH:/api/tickets/:id', async () => {
  const res = await request(app).patch(
    `/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}}`
  );
  expect(res.status).not.toBe(404);
});

it('returns unauthorized when user is not logged in', async () => {
  const res = await request(app).patch(
    `/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}}`
  );
  expect(res.status).toBe(401);
});

it('returns 400 bad request when the update data is invalid', async () => {
  const cookies = global.getCookies();

  //! pass price as a string
  await request(app).patch(
      `/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}}`
    )
    .send({
      title: faker.lorem.word(10),
      price: faker.lorem.word(10),
    })
    .set('Cookie', cookies)
    .expect(400);
});

it('returns 404 when ticket is not found', async () => {
  const cookies = global.getCookies();
  const res = await request(app).patch(
    `/api/tickets/${mongoose.Types.ObjectId.generate().toString('hex')}}`
  )
  .set('Cookie', cookies)
  .expect(404);
});

it('rejects the update unless from owner', async () => {
  const ownerCookies = global.getCookies();
  const randomCookies = global.getCookies();

  const ticket = await global.createTicket(ownerCookies);
  const res = await request(app).patch(
    `/api/tickets/${ticket.id}`
  )
  .set('Cookie', randomCookies)
  .send({
    title: faker.lorem.word(10),
  });
  expect(res.status).toBe(404);
});

it('allows owner to update the ticket with valid data', async () => {
  const ownerCookies = global.getCookies();

  const ticket = await global.createTicket(ownerCookies);
  const res = await request(app).patch(
    `/api/tickets/${ticket.id}`
  )
  .set('Cookie', ownerCookies)
  .send({
    title: faker.lorem.word(10),
  })
  .expect(200);
});
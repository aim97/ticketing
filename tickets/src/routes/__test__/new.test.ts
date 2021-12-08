import request from 'supertest';
import faker from 'faker';

import app from '../../app';

it('has a route at POST:/api/tickets', async () => {
  const res = await request(app).post('/api/tickets/');
  expect(res.status).not.toBe(404);
});

it('requires authentication, and returns 401 unauthorized when a the request doesn\'t have authorization token', async() => {
  const res = await request(app).post('/api/tickets/');
  expect(res.status).toBe(401);
});

it('returns bad request when the ticket is invalid', async () => {
  const cookies = global.getCookies();
  //! empty object is not allowed
  let res = await request(app)
    .post('/api/tickets/')
    .send({})
    .set('Cookie', cookies);
  expect(res.status).toBe(400);

  //! both title and price are required
  res = await request(app)
    .post('/api/tickets/')
    .send({title: faker.lorem.word(10)})
    .set('Cookie', cookies);
  expect(res.status).toBe(400);

  res = await request(app)
    .post('/api/tickets/')
    .send({price: faker.datatype.float({min: 0, precision: 0.01})})
    .set('Cookie', cookies);
  expect(res.status).toBe(400);

  //! negative price is not allowed
  res = await request(app)
    .post('/api/tickets/')
    .send({
      title: faker.lorem.word(10),
      price: faker.datatype.float({max: -1, precision: 0.01}) //* the max is -1 so the price is always negative
    })
    .set('Cookie', cookies);
  expect(res.status).toBe(400);
});

it('retuns 201 created for valid data and credentials', async() => {
  const cookies = global.getCookies();
  await request(app)
    .post('/api/tickets/')
    .send({
      title: faker.lorem.word(10),
      price: faker.datatype.float({min: 0, precision: 0.01}) //* the max is -1 so the price is always negative
    })
    .set('Cookie', cookies)
    .expect(201);
});
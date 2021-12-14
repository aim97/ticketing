import request from 'supertest';

import { app } from '../../app';

it('has a path at GET:/api/tickets/', async () => {
  const res = await request(app).get('/api/tickets/');
  expect(res.status).not.toBe(404);
});

it('doesn\'t require authentication', async () => {
  const res = await request(app).get('/api/tickets/');
  expect(res.status).not.toBe(401);
});

// this test is not sufficient we are just doing it like that to avoid headache
it('returns the data for all inserted tickets with 200 status code', async () => {
  const cookies = global.getCookies();

  const promises = [];
  for (let i = 0;i < 10;i++) promises.push(global.createTicket(cookies));

  const tickets = await Promise.all(promises);

  const res = await request(app).get('/api/tickets/');
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(tickets.length);
});

// we may include pagination later
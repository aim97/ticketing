import httpStatus from 'http-status';
import request from 'supertest';
import { app } from '../../app';
import faker from 'faker';

it('returns 201 for a successful signup', async () => {
  const user = await global.createUser();

  return request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(httpStatus.OK);
});

it('sets an access token cookie for successful signup', async () => {
  const user = await global.createUser();

  const res = await request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(httpStatus.OK);

  expect(res.get('Set-Cookie')).toBeDefined();
});

it('returns BAD_REQUEST error for a bad request for missing password', async () => {
  return request(app)
    .post('/api/users/login')
    .send({
      email: faker.internet.email(),
    })
    .expect(httpStatus.BAD_REQUEST);
});

it('returns BAD_REQUEST error for a bad request for missing email', async () => {
  return request(app)
    .post('/api/users/login')
    .send({
      password: faker.internet.password(),
    })
    .expect(httpStatus.BAD_REQUEST);
});

it('returns UNAUTHORIZED error with worng password', async () => {
  const user = await global.createUser();

  return request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: faker.internet.password(),
    })
    .expect(httpStatus.UNAUTHORIZED);
});

it('returns UNAUTHORIZED error with worng email', async () => {
  const user = await global.createUser();

  return request(app)
    .post('/api/users/login')
    .send({
      email: faker.internet.email(),
      password: user.password,
    })
    .expect(httpStatus.UNAUTHORIZED);
});
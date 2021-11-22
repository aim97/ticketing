import httpStatus from 'http-status';
import request from 'supertest';
import { app } from '../../app';
import faker from 'faker';

it('returns 201 for a successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    .expect(httpStatus.CREATED);
});

it('sets an access token cookie for successful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    .expect(httpStatus.CREATED);


  expect(res.get('Set-Cookie')).toBeDefined();
});


it('returns 400 for a bad request for missing password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: faker.internet.email(),
    })
    .expect(httpStatus.BAD_REQUEST);
}); 

it('returns 400 for a bad request for missing email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      password: faker.internet.password(),
    })
    .expect(httpStatus.BAD_REQUEST);
});

it('returns 400 for a bad request for missing email and password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(httpStatus.BAD_REQUEST);
});

it('returns prohits double email error', async () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(httpStatus.CREATED);

  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(httpStatus.BAD_REQUEST);
});

it('rejects password shorter than 6 chars', async () => {
  const user = {
    email: faker.internet.email(),
    password: '12345',
  };

  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(httpStatus.BAD_REQUEST);
});

it('rejects invalid email', async () => {
  const user = {
    email: 'invalidemail',
    password: faker.internet.password(),
  };

  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(httpStatus.BAD_REQUEST);
});
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

it('returns 400 for a bad request', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: faker.internet.email(),
    })
    .expect(httpStatus.BAD_REQUEST);
}); 
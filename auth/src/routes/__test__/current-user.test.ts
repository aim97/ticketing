import httpStatus from 'http-status';
import request from 'supertest';
import { app } from '../../app';

it('returns 200 OK for if user is logged in and the token is valid', async () => {
  const cookie = await global.getCookies();

  return request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(httpStatus.OK);
});

it('returns 200 OK but user=null if user is not logged in', async () => {
  const res = await request(app)
    .get('/api/users/currentuser')
    .expect(httpStatus.OK);

  expect(res.body.user).toBeNull();
});
import httpStatus from 'http-status';
import request from 'supertest';
import { app } from '../../app';

it('returns 201 for a successful signup', async () => {
  const cookie = await global.getCookies();

  return request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(httpStatus.OK);
});
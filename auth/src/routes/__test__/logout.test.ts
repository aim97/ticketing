import httpStatus from 'http-status';
import request from 'supertest';
import { app } from '../../app';

it('Unsets the token on the response obtained', async () => {
  const cookie = await global.getCookies();

  const res = await request(app)
    .post('/api/users/logout')
    .set('Cookie', cookie)
    .expect(httpStatus.OK);

  const token = res.get('Set-Cookie')
    .find((c) => c.startsWith('express:sess='))?.split(';')[0].split('=')[1];

  expect(token === undefined || token === '').toBeTruthy();

  expect(res.get('Set-Cookie')).toBeDefined();
});

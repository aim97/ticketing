import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import router from 'next/router';
export default () => {
  const  { doRequest } = useRequest({
    url: '/api/users/logout',
    method: 'post',
    body: {},
    onSuccess: () => setTimeout(() => router.push('/'), 3000),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='container'>
      <div className='jumbotron'>
        <h1 className='display-4'>Good Bye</h1>
        <p className='lead'>let us see you soon</p>
      </div>
    </div>
  )
};
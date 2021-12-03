import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';

import Header from '../components/Header';
import getAxiosInstance from '../adapter';

const AppComponent = ({ Component, pageProps, currentUser}) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  
  const { data } = await getAxiosInstance(ctx).get('/api/users/currentuser');
  const { user: currentUser } = data;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, currentUser };
}

export default AppComponent;
import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
    console.log(errors);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
      <div className="w-xl-25 w-lg-50 w-md-50 w-75">
        <h2 
          className="text-center mb-4 pb-3" 
          style={{
            borderBottom: "1px solid forestgreen",
            letterSpacing: "3px",
          }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group pb-3">
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              placeholder="Enter email" 
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* { errors && 
              <p id="email-feedback text-danger">
                {errors.find((err) => err.field === 'email').message}
              </p> 
            } */}
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              placeholder="Enter password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* { 
              errors && 
              <p id="password-feedback text-danger">
                {errors.find((err) => err.field === 'password').message}
              </p>
            } */}
          </div>
          <button className="btn btn-primary btn-bloc w-100 mt-3" id="signup-btn" >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
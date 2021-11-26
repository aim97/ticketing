import { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

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
            <p id="email-feedback text-danger"></p>
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              placeholder="Enter password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id="password-feedback text-danger"></p>
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
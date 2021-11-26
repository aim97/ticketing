
const SignUp = () => {
  return (
    <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
      <div className="w-25">
        <h2 
          className="text-center mb-4 pb-3" 
          style={{
            borderBottom: "1px solid forestgreen",
            letterSpacing: "3px",
          }}
        >
          Sign Up
        </h2>
        <form>
          <div className="form-group pb-3">
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
            <p id="email-feedback"></p>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
            <p id="password-feedback"></p>
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
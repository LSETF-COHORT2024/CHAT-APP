import React from "react";
import { useNavigate,Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  function handsubmit() {  
     navigate("/")
  }
  return (
    <div className="formContainer">
      <div class=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button >Sign in</button>
          {error && <span>{error}</span>}

        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

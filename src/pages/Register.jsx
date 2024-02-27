import React from "react";
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  function handsubmit() {  
     navigate("/")
  }
  return (
    <div className="formContainer">
      <div class=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="" alt="" />
            <span>Add an avater </span>
          </label>
          <button onClick={handsubmit}>Sign up</button>
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

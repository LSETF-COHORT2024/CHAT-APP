import React from "react";
import { useNavigate,Link } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const { currentUser } = UserAuth();
  const navigate = useNavigate()

  // const handsubmit = async () => {
  //   try {

  //   } catch(error)
    
  // }

  function handsubmit() {  
    navigate("/")
 }
  
  return (
    <div className="formContainer">
      <div class=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button onClick={handsubmit}>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useNavigate,Link } from 'react-router-dom'
import { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate =useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/login")
      } catch (err) {
        setError(err.message);
      }
    };

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

import React from "react";
import { useNavigate,Link } from 'react-router-dom'
import { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault()
      const email = e.target[0].value;
      const password = e.target[1].value;
      
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <>
      {/* <div className="formContainer">
      <div className=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" id="email" />
          <input type="password" placeholder="password" id="password"/>

          <button >Sign in</button>
          {error && <span>{error}</span>}

        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div> */}
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <span className="logo">CHAT APP</span>
            <span className="title"> Login</span>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Sign in</button>
                {error && <span>{error}</span>}
                </div>
            </form>
            </div>
        </div>
        </div>
    </>
  );
};

export default Login;

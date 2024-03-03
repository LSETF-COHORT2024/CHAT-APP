import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import img from "../img/icons8-image-24.png"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db} from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const [error, setError] = useState(null);
  const navigate =useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate("/")
      console.log("User created:", user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="displayName" placeholder="Display Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign up</button>
          {error && <span>{error}</span>}
        </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

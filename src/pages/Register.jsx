import React from "react";
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db,storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";


const Register = () => {
  const [err,setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

  

    try{    

      const db = getFirestore();

      const res = await createUserWithEmailAndPassword(auth, email, password);

    
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on( 'state_changed', 
      (snapshot) => {
        // Progress updates
      },
      
      
      (err) => {
        setErr(true);
        alert('Error uploading profile picture. Please try again.');
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then( async (downloadURL) => {
          await updateProfile(res.user,{
            displayName,
            photoURL: downloadURL,
          });

          // Store user data in Firestore
          await setDoc(doc(db, "users", res.user.uid),{
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          // Create user's chat document in Firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
         
          navigate("/");
          alert('Registration successful!');

        }) .catch((error) => {
          console.error('Error getting download URL:', error);
          setErr(true);
          alert('Error getting download URL. Please try again.');
        
        });
      }
    );
      
    } catch (err) {
      setErr(true);
      alert('Error registering user. Please try again.');
    } 
  };  

  // const navigate = useNavigate()

  return (
    <div className="formContainer">
      <div class=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="" alt="" />
            <span>Add an avater </span>
          </label>
        <button>Sign up</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

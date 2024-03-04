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
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const storage = getStorage();
        const storageRef = ref(storage, displayName);
    
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          (error) => {
            setError(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL)=>{
              await updateProfile ( userCredential.user,{
                displayName,
                photoURL:downloadURL, 
              })
              await setDoc(doc(db,"users",userCredential.user.uid),{   
                uid:userCredential.user.uid,
                displayName,
                email,
                photoURL:downloadURL,
              })
              await setDoc(doc(db,"userchats",userCredential.user.uid),{})
         
            });
            navigate("/")
          }
        );
        
      } catch (err) {
        setError(err.message);
      }
    };
    

  return (
    <>
          <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="displayName" placeholder="Display Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="file" id="file" style={{display:"none"}} />
          <label htmlFor="file">
            <img src={img} alt="" />
            
            <span>Add an avater</span>
            </label>
          <button>Sign up</button>
          {error && <span>{error}</span>}
        </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </>
  );
};

export default Register;
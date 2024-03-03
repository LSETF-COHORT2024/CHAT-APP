import React from "react";
import Profile1 from "../img/pic-person-01.jpg";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Innkeeper chat</span>
      <div className="user">
        <img src={Profile1} alt="User Picture" />
        <span>Ceo</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;

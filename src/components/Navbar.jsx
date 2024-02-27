import React from "react";
import Profile1 from "../img/pic-person-01.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Innkeeper chat</span>
      <div className="user">
        <img src={Profile1} alt="User Picture" />
        <span>Ceo</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;

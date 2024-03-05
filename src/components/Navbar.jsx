
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
// import Profile1 from "../img/pic-person-01.jpg";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContexts";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate(); // Initialize useHistory

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">Innkeeper chat</span>
      <div className="user">
        {currentUser && (
          <>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );  
};

export default Navbar;

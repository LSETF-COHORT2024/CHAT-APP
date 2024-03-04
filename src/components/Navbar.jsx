// import React from "react";
// import Profile1 from "../img/pic-person-01.jpg";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <span className="logo">Innkeeper chat</span>
//       <div className="user">
//         <img src={Profile1} alt="User Picture" />
//         <span>Ceo</span>
//         <button onClick={()=>signOut(auth)}>logout</button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import Profile1 from "../img/pic-person-01.jpg";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
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
        <img src={Profile1} alt="User Picture" />
        <span>Ceo</span>
        <button onClick={handleLogout}>Logout</button> {/* Call handleLogout on button click */}
      </div>
    </div>
  );
};

export default Navbar;

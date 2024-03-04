
import React, { useState } from "react";
import Picture from "../img/pic-article-01.jpg";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(false); // Reset error state if user is found
      } else {
        setUser(null); // Reset user state if user is not found
        setErr(true);
      }
    } catch (err) {
      // console.error("Error searching for user:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Call handleSearch function when Enter key is pressed
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <button onClick={handleSearch}>Search</button> Added search button */}
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat">
          <img src={user.photoURL} alt="User Picture" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

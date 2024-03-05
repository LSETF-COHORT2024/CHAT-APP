
// import React, { useState } from "react";
// import Picture from "../img/pic-article-01.jpg";
// import { db } from "../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const handleSearch = async () => {
//     const q = query(collection(db, "users"), where("displayName", "==", username));

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => {
//           setUser(doc.data());
//         });
//         setErr(false); // Reset error state if user is found
//       } else {
//         setUser(null); // Reset user state if user is not found
//         setErr(true);
//       }
//     } catch (err) {
//       // console.error("Error searching for user:", err);
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(); // Call handleSearch function when Enter key is pressed
//     }
//   };

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input className="Input"
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {err && <span className="err">User not found!</span>}
//       {user && (
//         <div className="userChat">
//           <img src={user.photoURL} alt="User Picture" />
//           <div className="userChatInfo">
//             <span className="err">{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;


import React, { useContext, useState } from "react";
import Picture from "../img/pic-article-01.jpg";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContexts";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==",
      username));

    try {
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
    }  catch (err) {
        setErr(true)
    }
  }

  const handleKey = (e) => {
    e.key === "Enter" && handleSearch(); // Call handleSearch function when Enter key is pressed
  };

  const handleSelect = async () => {
    const combineId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    try{
    const res = await getDoc(doc(db,"chats", combineId));

    if(!res.exist()){
      // create a chat in chats collection
      await setDoc(doc, (db, "chats", combineId), {messages: [] })

      // create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combineId+"userInfo"]: {
          uid:user.uid,
          displayName:user.displayName,
          photoURL: user.photoURL
        },
        [combineId+".date"]: serverTimestamp()
      });

      await setDoc(doc, (db, "chats", combineId), {messages: [] })

      // create user chats
      await updateDoc(doc(db, "userChats", user.uid), {
        [ combineId+"userInfo"]: {
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combineId+".date"]: serverTimestamp()
      });
      }
    } catch (err) {}

    setUser(null)
    setUsername("")
  };

  return (
        <div className="search">
          <div className="searchForm">
            <input className="Input"
              type="text"
              placeholder="Find a user"
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {err && <span className="err">User not found!</span>}
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
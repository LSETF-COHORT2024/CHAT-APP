// import React, { useContext, useState } from "react";
// import  Attach from "../img/icons8-attach-24.png"
// import { ChatContext } from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContexts";
// import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// // import  Img from "../img/icons8-image-24.png"

// const Input = () => {
//   const [ text, setText ] = useState("")
//   const [ img, setImg ] = useState(null)

//   const {currentUser} = useContext(AuthContext)
//   const {data} = useContext(ChatContext)

//   const handleSend = async ()=> {

//     if(img){

//       const storageRef = ref(storage, uuid());
    
//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           // setError(error.message);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId),{
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );

//     } else{
//       await updateDoc(doc(db, "chats", data.chatId),{
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         })
//       })
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]:{
//         text
//       },
//       [data.chatId + ".date"] : serverTimestamp(), 
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]:{
//         text
//       },
//       [data.chatId + ".date"]: serverTimestamp(), 
//     });

//     setText("")
//     setImg(null)

//   }
  
//   return (
//      <div className="input">
//       <input type="text" 
//        placeholder="type something " 
//        onChange={(e) => setText(e.target.value)}
//        value={text} />
//       <div className="send">
//         <input type="file"
//          style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}/>
//         <label htmlFor="file">
//         <img src={Attach} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
//    </div>
//   );
// };

// export default Input;

import React, { useState } from "react";
import Attach from "../img/icons8-attach-24.png";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContexts";

const Input = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileUpload = async (file) => {
    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "chats", data.chatId, "messages"), {
              id: uuid(),
              text: "",
              senderId: currentUser.uid,
              date: new Date(),
              img: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSend = async () => {
    if (message || img) {
      if (img) {
        await handleFileUpload(img);
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: message,
            senderId: currentUser.uid,
            date: new Date(),
          }),
        });
      }
      setMessage("");
      setImg(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something"
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Attach} alt="Attach" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
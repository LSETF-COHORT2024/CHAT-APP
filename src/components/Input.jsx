import React, { useState } from "react";
import Attach from "../img/icons8-attach-24.png";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
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

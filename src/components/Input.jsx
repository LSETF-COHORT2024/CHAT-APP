// import React from "react";
// import  Attach from "../img/icons8-attach-24.png"
// // import  Img from "../img/icons8-image-24.png"

// const Input = () => {
//   return <div className="input">
//     <input type="text"  placeholder="type something " />
//     <div className="send">
//       <input type="file" style={{display:"none"}} id="file" />
//       <label htmlFor="file">
//       <img src={Attach} alt="" />
//       </label>
//       <button>send</button>
//     </div>
//   </div>;
// };

// export default Input;

import React, { useState } from "react";
import Attach from "../img/icons8-attach-24.png";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileUpload = async (file) => {
    try {
      const storageRef = ref(storage, "files/" + file.name);
      await uploadBytes(storageRef, file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSend = () => {
    setMessage("");
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
          onChange={(e) => handleFileUpload(e.target.files[0])}
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

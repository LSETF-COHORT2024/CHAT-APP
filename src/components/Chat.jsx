import React from "react";
import Add from "../img/add-user.png";
import Cam from "../img/icons8-video-call-50.png"
import More from "../img/icons8-more-50.png"
import Messages from "./Messages";
import Input from "./Input";
  	      
const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span> Innkeeper</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={Cam} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;

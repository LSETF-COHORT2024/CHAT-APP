import React, { useContext } from "react";
import Add from "../img/add-user.png";
import Cam from "../img/icons8-video-call-50.png"
import More from "../img/icons8-more-50.png"
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

  	      
const Chat = () => {
  const { data } = useContext(ChatContext)


  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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
}

export default Chat;

import React from "react";
import Attach from "../img/icons8-attach-24.png";
import Img from "../img/icons8-image-24.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="type something..." />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Input;

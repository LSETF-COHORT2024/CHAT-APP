import React from "react";

const Register = () => {
  return (
    <div className="formContainer">
      <div class=" formWrapper">
        <span className="logo">CHAT APP</span>
        <span className="title"> Register</span>
        <form>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="" alt="" />
            <span>Add an avater </span>
          </label>
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;

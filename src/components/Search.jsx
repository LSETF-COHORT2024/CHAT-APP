import React from "react";
import Picture from "../img/pic-article-01.jpg";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <img src={Picture} alt=" User Picture" />
        <div className="userChatInfo">
          <span>Innkeeper</span>
        </div>
      </div>
    </div>
  );
};

export default Search;

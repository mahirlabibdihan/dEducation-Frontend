import React, { useState } from "react";
import "./components.scss";
const UserCard = (props) => {
  return (
    <div className="user-card" aria-hidden="true">
      <img
        src={`http://localhost:5000/assets/images/${props.user.IMAGE}`}
        // onClick={() => ImageUpload()}
        alt=" "
      />
      <h5>{props.user.NAME}</h5>
    </div>
  );
};

export default UserCard;

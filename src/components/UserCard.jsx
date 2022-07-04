import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../store/GlobalContext";
import "./components.scss";
const UserCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  //
  useEffect(() => {
    console.log(globalCtx.selectedUser, props.user.USER_ID);
  }, [globalCtx.selectedUser]);
  return (
    <div
      className={`${
        globalCtx.selectedUser === props.user.USER_ID ? "active-" : ""
      }user-card`}
      aria-hidden="true"
      onClick={() => {
        if (globalCtx.selectedUser === props.user.USER_ID)
          globalCtx.setSelectedUser(-1);
        else globalCtx.setSelectedUser(props.user.USER_ID);
      }}
    >
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

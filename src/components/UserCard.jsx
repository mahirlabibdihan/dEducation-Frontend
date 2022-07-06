import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../store/GlobalContext";
import "./components.scss";
const UserCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  //
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      className={`${
        globalCtx.selectedIndex === props.id ? "active-" : ""
      }user-card`}
      aria-hidden="true"
      onClick={() => {
        if (globalCtx.selectedIndex === props.id)
          globalCtx.setSelectedIndex(-1);
        else globalCtx.setSelectedIndex(props.id);
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

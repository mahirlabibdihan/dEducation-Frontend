import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import "./UserCard.scss";
const UserCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      className={`${
        globalCtx.selectedIndex === props.id ? "active-user-card" : ""
      } user-card`}
      aria-hidden="true"
      onClick={() => {
        if (globalCtx.selectedIndex === props.id) {
          globalCtx.setSelectedIndex(-1);
          searchParams.delete("id");
          setSearchParams(searchParams);
        } else {
          globalCtx.setSelectedIndex(props.id);
          searchParams.set("id", props.id);
          setSearchParams(searchParams);
        }
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

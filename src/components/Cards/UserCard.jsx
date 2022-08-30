import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./UserCard.scss";
import { Fade } from "@mui/material";
import { API_BASE_URL } from "../..";
const UserCard = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);
  return (
    // <Zoom in={true}>
    <div
      className={`${
        searchParams.get("id") !== null &&
        Number(searchParams.get("id")) === props.id
          ? "active-user-card"
          : ""
      } ${
        props.user.isSelected === undefined ? "" : "selected-user-card"
      } user-card`}
      aria-hidden="true"
      onClick={() => {
        if (
          searchParams.get("id") !== null &&
          Number(searchParams.get("id")) === props.id
        ) {
          searchParams.delete("id");
          setSearchParams(searchParams);
        } else {
          searchParams.set("id", props.id);
          setSearchParams(searchParams);
        }
      }}
    >
      <Fade in={props.user.IMAGE !== undefined}>
        <img
          src={`${API_BASE_URL}/assets/images/${props.user.IMAGE}`}
          alt=" "
        />
      </Fade>

      <h5>{props.user.NAME}</h5>
    </div>
    // </Zoom>
  );
};

export default UserCard;

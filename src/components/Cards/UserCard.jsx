import React from "react";
import { useSearchParams } from "react-router-dom";
import "./UserCard.scss";
const UserCard = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
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
      <img
        src={`http://localhost:5000/assets/images/${props.user.IMAGE}`}
        alt=" "
      />
      <h5>{props.user.NAME}</h5>
    </div>
  );
};

export default UserCard;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./ListContainer.scss";
import UserCard from "./UserCard";
import GlobalContext from "../store/GlobalContext";

// import InputField from "../../components/InputField";

export const List = (props) => {
  console.log(props);
  return (
    <div className="list">
      {props.list.map((user, index) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};
const ListContainer = (props) => {
  const globalCtx = useContext(GlobalContext);
  console.log(props);
  return (
    <div
      className="list-container"
      // onClick={() => globalCtx.setSelectedUser(-1)}
      // aria-hidden="true"
    >
      <h2 className="header">{props.header}</h2>
      <Divider />
      <List list={props.list}></List>
    </div>
  );
};

export default ListContainer;

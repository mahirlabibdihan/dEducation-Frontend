import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./ListContainer.scss";

// import InputField from "../../components/InputField";

export const List = (props) => {
  return <div className="list">{props.list}</div>;
};
const ListContainer = (props) => {
  return (
    <div className="list-container">
      <h2 className="header">{props.header}</h2>
      <Divider />
      <List list={props.list}></List>
    </div>
  );
};

export default ListContainer;

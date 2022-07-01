import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./ListContainer.scss";

// import InputField from "../../components/InputField";

const ListContainer = (props) => {
  return (
    <div className="list-container">
      <h2 className="header">{props.header}</h2>
      <Divider />
      <div className="list">{props.list}</div>
    </div>
  );
};

export default ListContainer;

import React, { useContext } from "react";
import { Divider } from "@mui/material";
import { BatchesTable } from "../Tables/Tables";

const BatchContainer = (props) => {
  return (
    <div className="table-container">
      <h2 className="header">{props.header}</h2>
      <Divider />
      <BatchesTable list={props.list} />
    </div>
  );
};

export default BatchContainer;

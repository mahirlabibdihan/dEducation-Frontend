import React, { useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { BatchesTable } from "../../components/table";

export const List = (props) => {
  console.log(props);
  return (
    <BatchesTable list={props.list} />
    /* <div className="list">
      {props.list.map((course, index) => (
        <BatchCard course={course} id={index} />
      ))}
    </div> */
  );
};
const BatchContainer = (props) => {
  return (
    <div
      className="list-container"
      // onClick={() => globalCtx.setSelectedIndex(-1)}
      // aria-hidden="true"
    >
      <h2 className="header">{props.header}</h2>
      <Divider />
      <List list={props.list}></List>
    </div>
  );
};

export default BatchContainer;

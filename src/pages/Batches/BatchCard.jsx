import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../store/GlobalContext";
import "../../components/components.scss";
import { format } from "date-fns";
const BatchCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  //
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      className={`${
        globalCtx.selectedIndex === props.id ? "active-" : ""
      }batch-card`}
      aria-hidden="true"
      onClick={() => {
        if (globalCtx.selectedIndex === props.id)
          globalCtx.setSelectedIndex(-1);
        else globalCtx.setSelectedIndex(props.id);
      }}
    >
      <h6>{`Batch No: ${props.id + 1}`}</h6>
      <h6>{`Starting Date: ${format(
        new Date(props.course.START_DATE),
        "do MMMM, yyyy"
      )}`}</h6>
      <h6>{`Days: ${props.course.CLASS_DAYS}`}</h6>
      <h6>{`Time: ${props.course.CLASS_TIME}`}</h6>
      <h6>{`Total seats: ${props.course.SEATS}`}</h6>
    </div>
  );
};

export default BatchCard;

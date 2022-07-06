import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../store/GlobalContext";
import "../../components/components.scss";
const CourseCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  //
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      className={`${
        globalCtx.selectedIndex === props.id ? "active-" : ""
      }course-card`}
      aria-hidden="true"
      onClick={() => {
        if (globalCtx.selectedIndex === props.id)
          globalCtx.setSelectedIndex(-1);
        else globalCtx.setSelectedIndex(props.id);
      }}
    >
      <h6>{`Coaching: ${props.course.NAME}`}</h6>
      <h6>{`Class: ${props.course.CLASS}`}</h6>
      <h6>{`Subject: ${props.course.SUBJECT}`}</h6>
      <h6>{`Starting Date: ${props.course.START_DATE}`}</h6>
      <h6>{`Days: ${props.course.CLASS_DAYS}`}</h6>
      <h6>{`Time: ${props.course.CLASS_TIME}`}</h6>
    </div>
  );
};

export default CourseCard;

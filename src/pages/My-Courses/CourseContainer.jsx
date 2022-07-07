import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { StudentCourseCard, TutorCourseCard } from "./CourseCard";
import GlobalContext from "../../store/GlobalContext";

// import InputField from "../../components/InputField";

export const List = (props) => {
  const globalCtx = useContext(GlobalContext);
  console.log(props);
  return (
    <div className="list">
      {props.list.map((course, index) =>
        globalCtx.loggedInAs === "TUTOR" ? (
          <TutorCourseCard course={course} id={index} />
        ) : (
          <StudentCourseCard course={course} id={index} />
        )
      )}
    </div>
  );
};
const CourseContainer = (props) => {
  console.log(props);
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

export default CourseContainer;

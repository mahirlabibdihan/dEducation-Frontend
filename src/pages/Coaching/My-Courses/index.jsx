import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../../components/InputFields/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import CoachingButtons from "../CoachingButtons";
import { useNavigate } from "react-router";
import { List } from "../../../components/Containers/CardContainer";
import "./my-courses.scss";

// import InputField from "../../components/InputField";

const MyCourses = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const CoursesList = () => {
    return (
      <div className="course-list">
        <List list="" />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        <CoachingButtons />
      </div>
    );
  };
  return (
    <Grid className="my-courses-container">
      <CoursesList />
      {/* <RightPanel /> */}
    </Grid>
  );
};

export default MyCourses;

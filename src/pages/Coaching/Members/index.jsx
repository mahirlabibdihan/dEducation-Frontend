import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import CoachingButtons from "../CoachingButtons";
import { useNavigate } from "react-router";
import ListContainer from "../../../components/ListContainer";
import "./my-courses.scss";

// import InputField from "../../components/InputField";

const Members = () => {
  const [membersList, setMembersList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const CoursesList = () => {
    return <ListContainer header="My Courses" list={membersList} />;
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
      <RightPanel />
    </Grid>
  );
};

export default Members;

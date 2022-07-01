import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import CoachingButtons from "./CoachingButtons";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./coaching.scss";

// import InputField from "../../components/InputField";

const Coaching = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const CoachingHome = () => {
    return (
      <div className="coaching-home">
        <img
          src={require("../../assets/images/udvash.jpg")}
          alt="cover"
          className="cover-photo"
        ></img>
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
    <Grid className="coaching-container">
      <CoachingHome />
      <RightPanel />
    </Grid>
  );
};

export default Coaching;

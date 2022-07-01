import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import CoachingForm from "./CoachingForm";
import "./my-coachings.scss";

// import InputField from "../../components/InputField";

const MyCoachings = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("TUTOR");
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const list = [];
  //   for (let i = 0; i < 100; i++) {
  //     list.push(<h4>Dihan</h4>);
  //   }
  const CoachingCreator = () => {
    return (
      <div className="coaching-creator">
        <CoachingForm />
      </div>
    );
  };
  const CoachingsList = () => {
    return <ListContainer header="My Coachings" />;
  };
  return (
    <Grid className="my-coachings-container">
      <CoachingsList />
      {type === "TUTOR" ? <CoachingCreator /> : <></>}
    </Grid>
  );
};

export default MyCoachings;

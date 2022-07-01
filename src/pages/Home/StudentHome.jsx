import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import "./home.scss";

// import InputField from "../../components/InputField";

const StudentHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);

  const ListContainer = (props) => {
    return (
      <div className="short-list-container">
        <h2 className="header">{props.header}</h2>
        <Divider />
        <div className="short-list-box">
          <div className="short-list"></div>
          <Button
            variant="contained"
            className="next-button"
            onClick={() => {
              setTimeout(() => {
                navigate(props.path);
              }, 300);
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </div>
    );
  };
  const DashBoard = () => {
    return (
      <div className="dash-board">
        <ListContainer header="Tutors" path="/tutors" />
        <ListContainer header="Coachings" path="/coachings" />
      </div>
    );
  };
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  return (
    <Grid className="student-home-container">
      <DashBoard />
      {/* <SearchFilter /> */}
    </Grid>
  );
};

export default StudentHome;

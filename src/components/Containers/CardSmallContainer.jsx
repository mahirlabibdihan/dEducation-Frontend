import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import TutorsController from "../../controller/tutorsController";
import CoachingController from "../../controller/coachingController";
import UserCard from "../../components/Cards/UserCard";
import ProfileController from "../../controller/profileController";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StudentPanel from "../../components/Panels/StudentPanel";
import { setLoading } from "../../App";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
const tutorsController = new TutorsController();
const coachingController = new CoachingController();
const profileController = new ProfileController();

const CardSmallContainer = (props) => {
  const navigate = useNavigate();
  return (
    <div className="short-list-container">
      <h2 className="header">{props.header}</h2>
      <Divider />
      <div className="short-list-box">
        <div className="short-list">
          {props.list.map((tutor, index) => (
            <UserCard className="scroll" user={tutor} />
          ))}
        </div>
        <Button
          variant="contained"
          className="next-button"
          onClick={() => {
            setTimeout(() => {
              navigate(props.path);
            }, 300);
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "2.3rem" }} />
          {/* <ArrowRightIcon sx={{ fontSize: "4rem" }} /> */}
        </Button>
      </div>
    </div>
  );
};

export default CardSmallContainer;

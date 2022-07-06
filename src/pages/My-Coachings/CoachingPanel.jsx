import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import ProfilePic, { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./my-coachings.scss";
const CoachingBanner = (props) => {
  return (
    <div className="profile-banner">
      <div className="profile-picture">
        <PublicProfilePic image={props.coaching.IMAGE} />
      </div>

      <div className="banner-details">
        <h3 className="">{props.coaching.NAME}</h3>
        <Divider />
        <h6>{`Phone Number: ${props.coaching.PHONE_NUMBER}`}</h6>
        <h6>{`Address: ${props.coaching.ADDRESS}`}</h6>
      </div>
    </div>
  );
};
const CoachingPanel = (props) => {
  const navigate = useNavigate();
  const handleCourse = async () => {
    navigate({
      pathname: "/req_tutor/applicants",
      search: createSearchParams({
        coaching_id: props.coaching.COACHING_ID,
      }).toString(),
    });
  };
  return (
    <div className="coaching-panel">
      {props.coaching === undefined ? (
        <></>
      ) : (
        <>
          <CoachingBanner coaching={props.coaching} />
          {/* <Divider /> */}
          {/* <Button
            variant="contained"
            className="courses-button"
            onClick={handleCourse}
          >
            Courses
          </Button> */}
        </>
      )}
    </div>
  );
};

export default CoachingPanel;

import React, { useState, useContext, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import CoachingController from "../../controller/coachingController";
import "./coachings.scss";
const coachingController = new CoachingController();

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
  const globalCtx = useContext(GlobalContext);
  const joinCoaching = async () => {
    const result = await coachingController.joinCoaching(
      props.coaching.COACHING_ID
    );
  };

  return (
    <div className="coaching-panel">
      {props.coaching === undefined ? (
        <></>
      ) : (
        <>
          <CoachingBanner coaching={props.coaching} />
          {globalCtx.loggedInAs === "STUDENT" ? (
            <Button
              variant="contained"
              className="join-button"
              onClick={joinCoaching}
            >
              Join
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default CoachingPanel;
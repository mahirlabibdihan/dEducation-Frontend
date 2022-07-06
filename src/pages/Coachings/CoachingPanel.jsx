import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import CoachingController from "../../controller/coachingController";
import "./coachings.scss";
const tutionController = new TutionController();
const profileController = new ProfileController();
const coachingController = new CoachingController();
const CoachingPanel = (props) => {
  const globalCtx = useContext(GlobalContext);
  // console.log(props.tutor.TUTOR_ID);
  const [coaching, setCoaching] = useState(props.coaching);
  const joinCoaching = async () => {
    const list = await coachingController.joinCoaching(coaching.COACHING_ID);
    // setStudentsList(list.data);
    // window.location.reload();
  };
  const ProfileBanner = () => {
    return (
      <div className="profile-banner">
        <div className="profile-picture">
          <PublicProfilePic image={coaching.IMAGE} />
        </div>

        <div className="banner-details">
          <h3 className="">{coaching.NAME}</h3>
          <Divider />
          <h6>{`Phone Number: ${coaching.PHONE_NUMBER}`}</h6>
          <h6>{`Address: ${coaching.ADDRESS}`}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="coaching-panel">
      {coaching === undefined ? (
        <></>
      ) : (
        <>
          <ProfileBanner />
          {/* <Divider /> */}
          {/* <OfferForm tutor_id={tutor.TUTOR_ID} /> */}
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

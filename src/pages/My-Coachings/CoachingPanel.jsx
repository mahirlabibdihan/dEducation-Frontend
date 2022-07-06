import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import ProfilePic, { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import "./my-coachings.scss";
const tutionController = new TutionController();
const profileController = new ProfileController();

const CoachingPanel = (props) => {
  const globalCtx = useContext(GlobalContext);
  // console.log(props.tutor.TUTOR_ID);
  const [coaching, setCoaching] = useState(props.coaching);
  const joinCoaching = async () => {};
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
        </>
      )}
    </div>
  );
};

export default CoachingPanel;

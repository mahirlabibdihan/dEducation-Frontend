import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import TutorProfile from "../../components/TutorProfile";
const tutionController = new TutionController();
const profileController = new ProfileController();

export const TutionDetails = (props) => {
  const OfferDetails = [
    { label: "Tution Type", value: props.tution.TYPE },
    { label: "Salary (BDT)", value: props.tution.SALARY },
    {
      label: "Tutoring Days",
      value: `${props.tution.DAYS_PER_WEEK} Days / Week`,
    },
    { label: "Subjects", value: props.tution.SUBJECTS },
  ];
  return (
    <div className="tution-offer">
      <div className="vbox">
        {OfferDetails.map((row) => {
          return <h6>{`${row.label}: ${row.value}`}</h6>;
        })}
      </div>
    </div>
  );
};
const TutorPanel = (props) => {
  return (
    <div className="tutor-panel">
      {props.tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={props.tutor} />
          <Divider />
          <TutionDetails tution={props.tutor} />
        </>
      )}
    </div>
  );
};

export default TutorPanel;

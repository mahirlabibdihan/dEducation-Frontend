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
  const StudentEnd = (props) => {
    return props.tution.STATUS === "PENDING" ? (
      <h6>
        {`You have offered ${props.tutorName} to teach you 
        ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. 
        Classes will be taken ${props.tution.TYPE} and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    ) : (
      <h6>
        {`${props.tutorName} teaches you ${props.tution.SUBJECTS} 
        ${props.tution.DAYS_PER_WEEK} days a week. Classes are taken ${props.tution.TYPE} 
        and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    );
  };
  const TutorEnd = (props) => {
    return props.tution.STATUS === "PENDING" ? (
      <h6>
        {`${props.studentName} has offered you to teach 
        ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. 
        Classes will be taken ${props.tution.TYPE} and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    ) : (
      <h6>
        {`You teach ${props.studentName} ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. Classes are taken ${props.tution.TYPE} 
      and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    );
  };
  return (
    <div className="tution-offer">
      <div className="vbox">
        {props.type === "tutor" ? (
          <TutorEnd tution={props.tution} studentName={props.studentName} />
        ) : (
          <StudentEnd tution={props.tution} tutorName={props.tutorName} />
        )}
        {/* {OfferDetails.map((row) => {
          return <h6>{`${row.label}: ${row.value}`}</h6>;
        })} */}
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
          <TutionDetails tution={props.tution} tutorName={props.tutor.NAME} />
        </>
      )}
    </div>
  );
};

export default TutorPanel;

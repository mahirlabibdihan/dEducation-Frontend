import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import StudentProfile from "../../components/StudentProfile";
import { TutionDetails } from "../My-Tutors/TutorPanel";
const tutionController = new TutionController();
const profileController = new ProfileController();

const OfferDetails = (props) => {
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

const StudentPanel = (props) => {
  return (
    <div className="student-panel">
      {props.student === undefined ? (
        <></>
      ) : (
        <>
          <StudentProfile student={props.student} />
          {props.tution === undefined ? (
            <></>
          ) : (
            <>
              <Divider />
              <TutionDetails
                tution={props.tution}
                studentName={props.student.NAME}
                type="tutor"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StudentPanel;

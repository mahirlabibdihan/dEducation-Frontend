import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import StudentProfile from "../../components/StudentProfile";
const tutionController = new TutionController();
const profileController = new ProfileController();

const StudentPanel = (props) => {
  return (
    <div className="student-panel">
      {props.student === undefined ? (
        <></>
      ) : (
        <StudentProfile student={props.student} />
      )}
    </div>
  );
};

export default StudentPanel;

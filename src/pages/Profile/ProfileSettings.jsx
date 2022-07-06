import React, { useState, useEffect, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import TutorProfileSettings from "./TutorProfileSettings";
import StudentProfileSettings from "./StudentProfileSettings";
import GlobalContext from "../../store/GlobalContext";
const profileController = new ProfileController();
const ProfileSettings = (props) => {
  const globalCtx = useContext(GlobalContext);
  return (
    <>
      {globalCtx.loggedInAs === "STUDENT" ? (
        <StudentProfileSettings />
      ) : (
        <TutorProfileSettings />
      )}
    </>
  );
};

export default ProfileSettings;

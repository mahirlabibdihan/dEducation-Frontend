import React, { useState, useEffect, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import TutorProfileSettings from "./TutorProfileSettings";
import StudentProfileSettings from "./StudentProfileSettings";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
const profileController = new ProfileController();
const cookies = new Cookies();
const ProfileSettings = (props) => {
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
  return (
    <>
      {type === "STUDENT" ? (
        <StudentProfileSettings />
      ) : (
        <TutorProfileSettings />
      )}
    </>
  );
};

export default ProfileSettings;

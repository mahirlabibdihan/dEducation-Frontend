import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import TutorProfile from "../../components/TutorProfile";
import OfferForm from "../../components/OfferForm";
const tutionController = new TutionController();

const TutorPanel = (props) => {
  return (
    <div className="tutor-panel">
      <TutorProfile tutor={props.tutor} />
      <Divider />
      <OfferForm tution={props.tutor} />
    </div>
  );
};

export default TutorPanel;

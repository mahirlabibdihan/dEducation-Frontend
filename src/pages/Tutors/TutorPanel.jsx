import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import TutorProfile from "../../components/TutorProfile";
import OfferForm from "../../components/OfferForm";

const TutorPanel = (props) => {
  return (
    <div className="tutor-panel">
      {props.tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={props.tutor} />
          <Divider />
          <OfferForm tutor_id={props.tutor.TUTOR_ID} />
        </>
      )}
    </div>
  );
};

export default TutorPanel;

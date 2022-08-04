import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import TutorProfile from "../../components/TutorProfile";
import OfferForm from "../../components/OfferForm";
import { TutionDetails } from "../My-Tutors/TutorPanel";
import GlobalContext from "../../store/GlobalContext";
const tutionController = new TutionController();

const TutorPanel = (props) => {
  const globalCtx = useContext(GlobalContext);
  const handleCancel = async () => {
    const result = await tutionController.cancelOffer(props.tutor.USER_ID);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
    }
  };
  return (
    <div className="tutor-panel">
      <TutorProfile tutor={props.tutor} />
      <Divider />
      {props.tution.STATUS === null ? (
        <OfferForm tution={props.tution} tutor_id={props.tutor.USER_ID} />
      ) : (
        <>
          <TutionDetails tution={props.tution} tutorName={props.tutor.NAME} />
          {props.tution.STATUS === "PENDING" ? (
            <Button
              variant="Contained"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default TutorPanel;

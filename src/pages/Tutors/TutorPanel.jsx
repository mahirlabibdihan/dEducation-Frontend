import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import TutorProfile from "../../components/TutorProfile";
import OfferForm from "../../components/OfferForm";
import { TutionDetails } from "../My-Tutors/TutorPanel";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
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
      {props.tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={props.tutor} />
          <Divider />
          {props.tution.STATUS === null ? (
            <OfferForm tutor_id={props.tutor.USER_ID} />
          ) : (
            <>
              <TutionDetails tution={props.tution} />
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
        </>
      )}
    </div>
  );
};

export default TutorPanel;

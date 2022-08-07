import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import TutorProfile from "./TutorProfile";
import OfferForm from "./OfferForm";
import TutionDetails from "./TutionDetails";
import { Button } from "@mui/material";
import TutionController from "../controller/tutionController";
import GlobalContext from "../store/GlobalContext";
import TutorsController from "../controller/tutorsController";
import "./TutorPanel.scss";
const tutorsController = new TutorsController();
const tutionController = new TutionController();
const TutorPanel = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [education, setEducation] = useState([]);
  const setEducationList = async () => {
    const result = await tutorsController.getEducation(props.tutor.USER_ID);
    console.log("FOUND", result.data);
    if (result.success) setEducation(result.data);
  };
  const handleCancel = async () => {
    const result = await tutionController.cancelOffer(props.tutor.USER_ID);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  useEffect(() => {
    setEducationList();
  }, []);
  return (
    <div className="tutor-panel">
      {props.tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={props.tutor} education={education} />
          <Divider />
          {props.tution.STATUS === null ? (
            <OfferForm tutor_id={props.tutor.USER_ID} />
          ) : (
            <>
              <TutionDetails
                tution={props.tution}
                tutorName={props.tutor.NAME}
              />
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

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
import Rating from "@mui/material/Rating";
const tutorsController = new TutorsController();
const tutionController = new TutionController();
const TutorPanel = (props) => {
  // console.log(props);
  const globalCtx = useContext(GlobalContext);
  const [rating, setRating] = useState(props.tution.RATING);
  const [education, setEducation] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const setEducationList = async () => {
    const result = await tutorsController.getEducation(props.tutor.USER_ID);
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
  const updateRating = async (newValue) => {
    setRating(newValue);
    const result = await tutionController.rate(props.tutor.USER_ID, newValue);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
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
                <div className="flex-center vbox">
                  <Divider />
                  <div className="rating-container poppins-font">
                    {`How would you rate ${
                      props.tutor.GENDER === "Male" ? "him" : "her"
                    }?`}
                  </div>
                  <Rating
                    className="rating"
                    name="simple-controlled"
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                      updateRating(newValue);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TutorPanel;

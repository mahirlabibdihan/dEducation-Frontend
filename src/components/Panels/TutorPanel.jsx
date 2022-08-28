import React, { useState, useContext, useEffect } from "react";
import Divider from "@mui/material/Divider";
import TutorProfile from "../Profiles/TutorProfile";
import OfferForm from "../Forms/OfferForm";
import TutionDetails from "./TutionDetails";
import Button from "@mui/material/Button";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import TutorsController from "../../controller/tutorsController";
import Rating from "@mui/material/Rating";
import "./TutorPanel.scss";
import { MultiLineField } from "../InputFields";
import Feedback from "../Cards/Feedback";
import { useLocation } from "react-router-dom";
import Zoom from "@mui/material/Zoom";
import { RestrictedButton } from "../Buttons";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const ProfilePanel = (props) => {
  const location = useLocation();
  return (
    <>
      <TutorProfile tutor={props.tutor} education={props.education} />
      <Divider />
      {location.pathname.split("/")[1] === "home" ||
      location.pathname.split("/")[1] === "req_tutor" ? (
        <div className="feedback-container">
          <h6 className="standard-font-1 text-center mb-0">Feedbacks</h6>
          <Divider />
          {props.feedbacks.map((feedback) => (
            <Feedback rating={feedback.RATING} review={feedback.REVIEW} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {props.tution.STATUS === null ||
      props.tution.STATUS === "REJECTED" ||
      props.tution.STATUS === "CANCELLED" ? (
        <>
          <RestrictedButton
            isDisabled={props.tutor.AVAILABILITY === "Unavailable"}
            label="Offer"
            onClick={(e) => props.setPage("offer")}
          ></RestrictedButton>
        </>
      ) : (
        <div>
          {props.tution.STATUS === "PENDING" ||
          props.tution.STATUS === "UPDATE" ? (
            <div className="vbox">
              <TutionDetails
                tution={props.tution}
                tutorName={props.tutor.NAME}
              />
              <Button
                variant="Contained"
                className="red-button full-width"
                onClick={props.handleCancel}
              >
                Cancel
              </Button>
            </div>
          ) : location.pathname.split("/")[1] === "home" ? (
            <>
              <h6 className="standard-font-1">
                {`You are already a student of `}
                <b>{props.tutor.NAME}</b>
              </h6>
              <Button
                variant="contained"
                className="blue-button full-width"
                onClick={(e) => props.setPage("offer")}
              >
                Update
              </Button>
            </>
          ) : (
            <div className="flex-center vbox">
              <TutionDetails
                tution={props.tution}
                tutorName={props.tutor.NAME}
              />
              {/* <Divider /> */}
              <div className="rating-container poppins-font">
                {`How would you rate ${
                  props.tutor.GENDER === "Male" ? "him" : "her"
                }?`}
              </div>
              <Rating
                className="rating"
                name="simple-controlled"
                value={props.feedback.rating}
                size="large"
                onChange={props.handleChange("rating")}
              />
              <div className="feedback-form vbox">
                <MultiLineField
                  rows={3}
                  label={"Feedback"}
                  type="text"
                  value={props.feedback.review}
                  id={"review"}
                  onChange={props.handleChange}
                />
                <Button
                  variant="Contained"
                  className="blue-button full-width"
                  onClick={() => {
                    props.submitFeedback();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* <Button
        variant="contained"
        className="blue-button full-width"
        onClick={(e) => props.setPage("offer")}
      >
        Feedbacks
      </Button> */}
    </>
  );
};
const TutorPanel = (props) => {
  console.log("TUTOR", props);
  const location = useLocation();
  const globalCtx = useContext(GlobalContext);
  const [page, setPage] = useState("profile");
  const [feedback, setFeedback] = useState({
    rating: props.tution.RATING,
    review: props.tution.REVIEW,
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const handleChange = (prop) => (event) => {
    setFeedback({ ...feedback, [prop]: event.target.value });
  };
  const [education, setEducation] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const setEducationList = async () => {
    const result = await tutorsController.getEducation(props.tutor.USER_ID);
    if (result.success) setEducation(result.data);
  };
  const submitFeedback = async () => {
    // setRating(newValue);
    const result = await tutionController.rate(
      props.tutor.USER_ID,
      feedback.rating,
      feedback.review
    );
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const handleCancel = async () => {
    const result = await tutionController.cancelOffer(props.tutor.USER_ID);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const setFeedbackList = async () => {
    const res = await tutionController.getFeedbacks(props.tutor.USER_ID);
    console.log("Feedbacks", res);
    if (res.success) {
      setFeedbacks(res.data);
    }
  };
  useEffect(() => {
    setEducationList();
    setPage("profile");
    setFeedback({
      rating: props.tution.RATING,
      review: props.tution.REVIEW,
    });
    // console.log("=>", props);
    if (
      location.pathname.split("/")[1] === "home" ||
      location.pathname.split("/")[1] === "req_tutor"
    ) {
      setFeedbackList();
    }
  }, [props]);

  return (
    <Zoom in={true}>
      <div className="tutor-panel">
        {props.tutor === undefined ? (
          <></>
        ) : page === "offer" ? (
          <>
            <OfferForm
              tutor={props.tutor}
              tution={props.tution}
              post={props.post}
            />
            <Button
              variant="contained"
              className="blue-button full-width"
              onClick={(e) => setPage("profile")}
            >
              Back
            </Button>
          </>
        ) : (
          <ProfilePanel
            tutor={props.tutor}
            tution={props.tution}
            feedback={feedback}
            feedbacks={feedbacks}
            submitFeedback={submitFeedback}
            handleCancel={handleCancel}
            education={education}
            setPage={setPage}
            handleChange={handleChange}
          />
        )}
      </div>
    </Zoom>
  );
};

export default TutorPanel;

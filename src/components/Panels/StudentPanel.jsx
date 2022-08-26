import React, { useContext } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import StudentProfile from "../Profiles/StudentProfile";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import TutionDetails from "./TutionDetails";
import "./StudentPanel.scss";
import { Rating } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { Zoom } from "@mui/material";
const tutionController = new TutionController();
const coachingController = new CoachingController();
const courseController = new CourseController();
const StudentPanel = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const acceptOffer = async () => {
    const res = await tutionController.acceptOffer(props.student.USER_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  const rejectOffer = async () => {
    const res = await tutionController.rejectOffer(props.student.USER_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  const approveJoinRequest = async () => {
    const res = await coachingController.approveJoinRequest(
      props.coaching.COACHING_ID,
      props.student.USER_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  const declineJoinRequest = async () => {
    const res = await coachingController.declineJoinRequest(
      props.coaching.COACHING_ID,
      props.student.USER_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  const approveEnrollment = async () => {
    const res = await courseController.approveEnrollment(
      props.course.batch,
      props.student.USER_ID
    );

    if (res.success) {
      console.log(res);
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  const declineEnrollment = async () => {
    const res = await courseController.declineEnrollment(
      props.course.batch,
      props.student.USER_ID
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  return (
    <Zoom in={props.student !== undefined}>
      <div className="student-panel">
        <StudentProfile student={props.student} />
        {props.tution === undefined ? (
          props.offer === undefined ? (
            props.coaching === undefined ? (
              props.course === undefined ? (
                <></>
              ) : (
                <>
                  <Divider />
                  <h6 className="standard-font-1">
                    <b>{props.student.NAME}</b>
                    {` has requested to enroll in `}
                    <b>{`${props.course.subject}, ${props.course.class}, ${props.course.coaching}`}</b>
                  </h6>
                  <Button
                    variant="contained"
                    className="blue-button full-width"
                    onClick={approveEnrollment}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    className="red-button full-width"
                    onClick={declineEnrollment}
                  >
                    Decline
                  </Button>
                </>
              )
            ) : (
              <>
                <Divider />
                <h6 className="standard-font-1">
                  <b>{props.student.NAME}</b>
                  {` has requested to join `}
                  <b>{props.coaching.NAME}</b>
                </h6>
                <Button
                  variant="contained"
                  className="blue-button full-width"
                  onClick={approveJoinRequest}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  className="red-button full-width"
                  onClick={declineJoinRequest}
                >
                  Decline
                </Button>
              </>
            )
          ) : (
            <>
              <Divider />
              <TutionDetails
                tution={props.offer}
                studentName={props.student.NAME}
                type="tutor"
              />
              <Button
                variant="contained"
                className="blue-button full-width"
                onClick={acceptOffer}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                className="red-button full-width"
                onClick={rejectOffer}
              >
                Reject
              </Button>
            </>
          )
        ) : (
          <>
            <Divider />
            <TutionDetails
              tution={props.tution}
              studentName={props.student.NAME}
              type="tutor"
            />
            <Divider />
            <div className="flex-center vbox">
              {props.tution.RATING === null ? (
                <></>
              ) : (
                <Rating
                  className="rating"
                  name="simple-controlled"
                  value={props.tution.RATING}
                  size="large"
                  // onChange={props.handleChange("rating")}
                />
              )}
              {props.tution.REVIEW === null ? (
                <></>
              ) : (
                <h6 className="standard-font-1">{props.tution.REVIEW}</h6>
              )}
            </div>
          </>
        )}
      </div>
    </Zoom>
  );
};

export default StudentPanel;

import React, { useContext } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../controller/tutionController";
import StudentProfile from "./StudentProfile";
import GlobalContext from "../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import TutionDetails from "./TutionDetails";
import "./StudentPanel.scss";
const tutionController = new TutionController();

const StudentPanel = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const offer = props.offer;
  const acceptOffer = async () => {
    console.log(offer);
    const res = await tutionController.acceptOffer(props.student.USER_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
    }
  };
  const rejectOffer = async () => {
    const res = await tutionController.rejectOffer(props.student.USER_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
    }
  };
  return (
    <div className="student-panel">
      <StudentProfile student={props.student} />
      <Divider />
      {props.tution === undefined ? (
        <>
          <TutionDetails
            tution={props.offer}
            studentName={props.student.NAME}
            type="tutor"
          />
          <Button
            variant="contained"
            className="accept-button"
            onClick={acceptOffer}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            className="reject-button"
            onClick={rejectOffer}
          >
            Reject
          </Button>
        </>
      ) : (
        <TutionDetails
          tution={props.tution}
          studentName={props.student.NAME}
          type="tutor"
        />
      )}
    </div>
  );
};

export default StudentPanel;

import React, { useContext } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import StudentProfile from "../Profiles/StudentProfile";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import TutionDetails from "./TutionDetails";
import "./StudentPanel.scss";
const tutionController = new TutionController();

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
  return (
    <div className="student-panel">
      <StudentProfile student={props.student} />
      {props.tution === undefined ? (
        props.offer === undefined ? (
          <></>
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
        </>
      )}
    </div>
  );
};

export default StudentPanel;

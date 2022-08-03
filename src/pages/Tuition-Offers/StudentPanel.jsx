import React, { useContext } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import StudentProfile from "../../components/StudentProfile";
import { showToast } from "../../App";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
const tutionController = new TutionController();

const OfferDetails = (props) => {
  const OfferDetails = [
    { label: "Tution Type", value: props.offer.TYPE },
    { label: "Salary (BDT)", value: props.offer.SALARY },
    {
      label: "Tutoring Days",
      value: `${props.offer.DAYS_PER_WEEK} Days / Week`,
    },
    { label: "Subjects", value: props.offer.SUBJECTS },
  ];
  return (
    <div className="tution-offer">
      <div className="vbox">
        {OfferDetails.map((row) => {
          return <h6>{`${row.label}: ${row.value}`}</h6>;
        })}
      </div>
    </div>
  );
};

const StudentPanel = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const offer = props.offer;
  const acceptOffer = async () => {
    console.log(offer);
    const result = await tutionController.acceptOffer(props.student.USER_ID);
    if (result.success) {
      showToast("Accepted tution offer");
      // window.location.reload();
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
      // searchParams.set
    } else {
      showToast("Server error occured", "error");
    }
  };
  const rejectOffer = async () => {
    const result = await tutionController.rejectOffer(props.student.USER_ID);
    if (result.success) {
      showToast("Rejected tution offer");
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
      // window.location.reload();
    } else {
      showToast("Server error occured", "error");
    }
  };
  return (
    <div className="student-panel">
      <StudentProfile student={props.student} />
      <Divider />
      <OfferDetails offer={props.offer} />
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
    </div>
  );
};

export default StudentPanel;

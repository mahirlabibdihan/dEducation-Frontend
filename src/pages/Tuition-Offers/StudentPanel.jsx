import React from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import StudentProfile from "../../components/StudentProfile";
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
  const offer = props.offer;
  const acceptOffer = async () => {
    const result = await tutionController.acceptOffer(offer.STUDENT_ID);
  };
  const rejectOffer = async () => {
    const result = await tutionController.rejectOffer(offer.STUDENT_ID);
  };
  return (
    <div className="student-panel">
      <StudentProfile student={offer} />
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

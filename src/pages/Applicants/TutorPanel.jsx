import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import { TutorProfile } from "../My-Tutors/TutorPanel";
const tutionController = new TutionController();
const profileController = new ProfileController();

const OfferForm = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    type: props.tution.TYPE,
    desired_tutor_gender: props.tution.DESIRED_TUTOR_GENDER,
    subjects: props.tution.SUBJECTS,
    days_per_week: props.tution.DAYS_PER_WEEK,
    salary: props.tution.SALARY,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const tutorRequestForm = [
    {
      label: "Tuition Type",
      id: "type",
      value: values.type,
    },
    {
      label: "Subjects",
      id: "subjects",
      value: values.subjects,
    },
    {
      label: "Days / Week",
      id: "days_per_week",
      value: values.days_per_week,
    },
    {
      label: "Salary (BDT)",
      id: "salary",
      value: values.salary,
    },
  ];
  const handleOffer = async (event) => {
    console.log(props);
    const result = await tutionController.offer(values, props.tutor_id);
    console.log(result);
    if (result.success) {
      window.location.reload();
    }
  };
  return (
    <div className="offer-form">
      {/* <h1 className="header"> Need a tutor? </h1> */}
      <Divider />
      <div className="input-fields">
        {tutorRequestForm.map((field) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button
        variant="contained"
        className="offer-button"
        onClick={handleOffer}
      >
        Offer
      </Button>
    </div>
  );
};

const TutorPanel = (props) => {
  console.log(props.tutor.TUTOR_ID);
  const [tutor, setTutor] = useState(props.tutor);
  return (
    <div className="tutor-panel">
      {tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={tutor} />
          <Divider />
          <OfferForm tutor_id={tutor.TUTOR_ID} tution={props.tution} />
        </>
      )}
    </div>
  );
};

export default TutorPanel;

import React, { useState, useContext, useEffect } from "react";
import InputField, { InputField2 } from "./InputField";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../controller/tutionController";
const tutionController = new TutionController();

const OfferForm = (props) => {
  const [values, setValues] = useState(
    props.tution === undefined
      ? {
          type: "",
          desired_tutor_gender: "",
          subjects: "",
          days_per_week: "",
          salary: "",
        }
      : {
          type: props.tution.TYPE,
          desired_tutor_gender: props.tution.DESIRED_TUTOR_GENDER,
          subjects: props.tution.SUBJECTS,
          days_per_week: props.tution.DAYS_PER_WEEK,
          salary: props.tution.SALARY,
        }
  );
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
    const result = await tutionController.offer(values, props.tution.tutor_id);
    if (result.success) {
      window.location.reload();
    }
  };
  return (
    <div className="offer-form">
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

export default OfferForm;

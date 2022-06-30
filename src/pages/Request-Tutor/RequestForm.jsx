import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
const RequestForm = () => {
  const [values, setValues] = useState({
    type: "",
    desired_tutor_gender: "",
    subjects: "",
    days_per_week: "",
    salary: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="request-form">
      <h1 className="header"> Request a tutor? </h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Tuition Type",
            id: "type",
            value: values.type,
          },
          {
            label: "Desired Tutor Gender",
            id: "desired_tutor_gender",
            value: values.desired_tutor_gender,
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
        ].map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button variant="contained" className="post-button">
        Post
      </Button>
    </div>
  );
};

export default RequestForm;

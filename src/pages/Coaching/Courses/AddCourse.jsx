import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../../components/InputField";
import { Button } from "@mui/material";
import "./courses.scss";
const AddCourse = () => {
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
    <div className="search-box">
      <h1 className="header">New Course</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Title",
            id: "days_per_week",
            value: values.days_per_week,
          },
          {
            label: "Subjects",
            id: "subjects",
            value: values.subjects,
          },
          {
            label: "Class",
            id: "desired_tutor_gender",
            value: values.desired_tutor_gender,
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
      <Button variant="contained" className="apply-button">
        Add
      </Button>
    </div>
  );
};

export default AddCourse;

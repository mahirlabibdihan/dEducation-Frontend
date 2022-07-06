import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import "./my-courses.scss";
const coachingController = new CoachingController();
const courseController = new CourseController();

const CourseForm = () => {
  const [values, setValues] = useState({
    class: "",
    subject: "",
    batch: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCoaching = async (event) => {
    const result = await courseController.create(values);
  };
  return (
    <div className="coaching-form">
      <h1 className="header">New Coaching</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Full Name",
            id: "name",
            value: values.name,
          },
          {
            label: "Phone Number",
            id: "phone",
            value: values.phone,
          },
          {
            label: "Address",
            id: "address",
            value: values.address,
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
      <Button
        variant="contained"
        className="create-button"
        onClick={createCoaching}
      >
        Create
      </Button>
    </div>
  );
};

export default CourseForm;

import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
const tutionController = new TutionController();
const RequestForm = () => {
  const globalCtx = useContext(GlobalContext);
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
  const handlePost = async (event) => {
    const result = await tutionController.post(values);
    console.log(result);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const tutorRequestForm = [
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
  ];
  return (
    <div className="request-form">
      <h1 className="header"> Need a tutor? </h1>
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
      <Button variant="contained" className="post-button" onClick={handlePost}>
        Post
      </Button>
    </div>
  );
};

export default RequestForm;

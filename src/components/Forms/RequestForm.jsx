import React, { useState } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import "./RequestForm.scss";
import { RequestFormFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";

const tutionController = new TutionController();
const RequestForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    tution_type: "Offline",
    desired_tutor_gender: "Any",
    subjects: [],
    days_per_week: 1,
    salary: 0,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePost = async (event) => {
    const res = await tutionController.post({
      type: values.tution_type,
      desired_tutor_gender: values.desired_tutor_gender,
      subjects: values.subjects.join(", "),
      days_per_week: values.days_per_week,
      salary: values.salary,
    });
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  return (
    <div className="request-form">
      <h1 className="header"> Need a tutor? </h1>
      <Divider />
      <RequestFormFields values={values} handleChange={handleChange} />
      <RestrictedButton
        isDisabled={values.subjects.length === 0}
        onClick={handlePost}
        label="Post"
      ></RestrictedButton>
    </div>
  );
};

export default RequestForm;

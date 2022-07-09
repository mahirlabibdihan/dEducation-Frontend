import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import "./my-coachings.scss";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();

const CoachingForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCoaching = async (event) => {
    const result = await coachingController.create(values);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
    }
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

export default CoachingForm;

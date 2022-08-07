import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2, MultiLineField } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import "./my-coachings.scss";
import GlobalContext from "../../store/GlobalContext";
import { showToast } from "../../App";
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
        ].map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
        {/* {
            label: "Address",
            id: "address",
            value: values.address,
          }, */}
        <MultiLineField
          rows={3}
          label={"Address"}
          type="text"
          value={values.address}
          id={"address"}
          onChange={handleChange}
        />
      </div>
      {values.name === "" || values.phone === "" || values.address === "" ? (
        <Button
          variant="contained"
          className="create-button disabled-button"
          onClick={createCoaching}
          disabled
        >
          Create
        </Button>
      ) : (
        <Button
          variant="contained"
          className="create-button"
          onClick={createCoaching}
        >
          Create
        </Button>
      )}
    </div>
  );
};

export default CoachingForm;

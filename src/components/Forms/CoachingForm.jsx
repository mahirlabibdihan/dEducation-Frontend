import React, { useState, useEffect, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { CoachingFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import Confirmation from "../Cards/Confirmation";
import { Zoom } from "@mui/material";
const coachingController = new CoachingController();

const CoachingForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCoaching = async (event) => {
    const res = await coachingController.create(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  return (
    <Zoom in={true}>
      <div className="coaching-form">
        <h1 className="header">New Coaching</h1>
        <Divider />
        <CoachingFields values={values} handleChange={handleChange} />
        <RestrictedButton
          isDisabled={
            values.name === "" || values.phone === "" || values.address === ""
          }
          onClick={() => setOpen(true)}
          label="Create"
        />
        <Confirmation
          open={open}
          setOpen={setOpen}
          onConfirm={createCoaching}
        />
      </div>
    </Zoom>
  );
};

export default CoachingForm;

import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./my-coachings.scss";

const coachingController = new CoachingController();
// import InputField from "../../components/InputField";

const CoachingForm = () => {
  const navigate = useNavigate();
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
    // if (result.success) navigate("/my_coachings");
    // console.log("OFFER", result);
    // setOffer(result.data);
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

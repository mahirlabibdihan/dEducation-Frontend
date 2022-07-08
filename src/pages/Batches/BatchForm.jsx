import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import "./batches.scss";
import SelectionField from "../../components/SelectionField";
import { FormControl } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
const coachingController = new CoachingController();
const courseController = new CourseController();

export const BatchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    start: "",
    days: "",
    time: "",
    seats: "",
  };
  const [values, setValues] = useState(initValues);
  useEffect(() => {
    // setList();
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const addBatch = async (event) => {
    const result = await courseController.addBatch(
      searchParams.get("course_id"),
      values
    );
    if (result.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <div className="batch-form">
      <h1 className="header">New Batch</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Starting Date",
            id: "start",
            value: values.start,
          },
          {
            label: "Class Days",
            id: "days",
            value: values.days,
          },
          {
            label: "Class Time",
            id: "time",
            value: values.time,
          },
          {
            label: "Total Seats",
            id: "seats",
            value: values.seats,
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
      <Button variant="contained" className="create-button" onClick={addBatch}>
        Add
      </Button>
    </div>
  );
};

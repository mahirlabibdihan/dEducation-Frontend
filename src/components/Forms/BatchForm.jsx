import React, { useState, useContext } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CourseController from "../../controller/courseController";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { BatchFields } from "../InputFields";
const courseController = new CourseController();

export const BatchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    start: "",
    start_date: new Date(),
    days: [],
    time: "",
    start_time: new Date("2014-08-18T00:00:00"),
    end_time: new Date("2014-08-18T00:00:00"),
    seats: 0,
  };
  const [values, setValues] = useState(initValues);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const addBatch = async (event) => {
    const res = await courseController.addBatch(searchParams.get("course_id"), {
      start: format(values.start_date, "MM/dd/yyyy"),
      days: values.days.toString(),
      time:
        format(values.start_time, "h:mm a") +
        "-" +
        format(values.end_time, "h:mm a"),
      seats: values.seats,
    });
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <div className="batch-form">
      <h1 className="header">New Batch</h1>
      <Divider />
      <BatchFields
        values={values}
        setValues={setValues}
        handleChange={handleChange}
      />
      <Button
        variant="contained"
        className="blue-button full-width"
        onClick={addBatch}
      >
        Add
      </Button>
    </div>
  );
};

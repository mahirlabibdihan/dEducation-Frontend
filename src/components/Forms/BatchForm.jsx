import React, { useState, useContext, useEffect } from "react";
import CourseController from "../../controller/courseController";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { BatchFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import { Zoom, Divider } from "@mui/material";
import { getTime } from "../../service/DateUtils";
import Confirmation from "../Cards/Confirmation";
const courseController = new CourseController();

export const BatchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    start_date: null,
    days: [],
    start_time: getTime(8),
    end_time: getTime(9),
    seats: 0,
  };
  const [values, setValues] = useState(initValues);
  const [open, setOpen] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    setValues({
      ...values,
      end_time: new Date(values.start_time.getTime() + 60 * 60 * 1000),
    });
  }, [values.start_time]);
  const addBatch = async (event) => {
    const res = await courseController.addBatch(searchParams.get("course_id"), {
      start: format(values.start_date, "MM/dd/yyyy"),
      days: values.days.toString(),
      start_time: format(values.start_time, "HH:mm:ss"),
      end_time: format(values.end_time, "HH:mm:ss"),
      seats: values.seats,
    });
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <Zoom in={true}>
      <div className="batch-form">
        <h1 className="header">New Batch</h1>
        <Divider />
        <BatchFields
          values={values}
          setValues={setValues}
          handleChange={handleChange}
        />
        <RestrictedButton
          isDisabled={
            values.days === [] ||
            values.seats === 0 ||
            values.start_time.getTime() >= values.end_time.getTime() ||
            values.start_date === null
          }
          onClick={() => setOpen(true)}
          label="Add"
        />
        <Confirmation open={open} setOpen={setOpen} onConfirm={addBatch} />
      </div>
    </Zoom>
  );
};

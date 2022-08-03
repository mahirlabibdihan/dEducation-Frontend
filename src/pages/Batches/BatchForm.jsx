import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2, NumberField } from "../../components/InputField";
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { showToast } from "../../App";
// import mobileDa
const coachingController = new CoachingController();
const courseController = new CourseController();

export const BatchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
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
  useEffect(() => {
    // setList();
  }, []);
  const handleChange = (prop) => (event) => {
    // console.log(prop, event);
    setValues({ ...values, [prop]: event.target.value });
  };
  const addBatch = async (event) => {
    // setValues({ ...values, start: format(values.start_date, "MM/dd/yyyy") });
    const result = await courseController.addBatch(
      searchParams.get("course_id"),
      {
        start: format(values.start_date, "MM/dd/yyyy"),
        days: values.days.toString(),
        time:
          format(values.start_time, "h:mm a") +
          "-" +
          format(values.end_time, "h:mm a"),
        seats: values.seats,
      }
    );
    if (result.success) {
      showToast("New batch added");
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    } else {
      showToast("Invalid batch", "error");
    }
  };
  return (
    <div className="batch-form">
      <h1 className="header">New Batch</h1>
      <Divider />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="input-fields">
          {/* <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
          <MobileDatePicker
            label="Starting Date"
            inputFormat="MM/dd/yyyy"
            value={values.start_date}
            onChange={(date) => {
              console.log(date);
              setValues({ ...values, start_date: date });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "100%",
                }}
              />
            )}
            className="date-picker"
          />
          <TimePicker
            label="Start Time"
            value={values.start_time}
            onChange={(time) => {
              console.log(time);
              setValues({ ...values, start_time: time });
              console.log(
                format(values.start_time, "h:mm a") +
                  "-" +
                  format(values.end_time, "h:mm a")
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "100%",
                  label: "black",
                }}
              />
            )}
          />

          <TimePicker
            label="End Time"
            value={values.end_time}
            onChange={(time) => {
              console.log(time);
              setValues({ ...values, end_time: time });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "100%",
                  label: "black",
                }}
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel
              htmlFor="demo-multiple-name"
              id="demo-multiple-name-label"
            >
              Class Days
            </InputLabel>
            <Select
              required
              // labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={values.days}
              onChange={handleChange("days")}
              input={<OutlinedInput label="Class Days" />}
              // label="Class Days"
              // MenuProps={MenuProps}
            >
              {days.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  // style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <NumberField
            label="Total Seats"
            min={0}
            max={1000}
            step={10}
            value={values.seats}
            id="seats"
            onChange={handleChange}
          />
          {/* {
              label: "Starting Date",
              id: "start",
              value: values.start,
            }, */}
          {/* {[
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
          ))} */}
          {/* <DatePicker
          className="date-picker"
          selected={values.start_date}
          onChange={(date) => {
            // console.log(
            //   `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            // );
            setValues({ ...values, start_date: date });
          }}
        /> */}
        </div>
      </LocalizationProvider>
      <Button variant="contained" className="create-button" onClick={addBatch}>
        Add
      </Button>
    </div>
  );
};

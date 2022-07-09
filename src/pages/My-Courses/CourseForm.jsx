import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import "./my-courses.scss";
import SelectionField from "../../components/SelectionField";
import { FormControl } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { format } from "date-fns";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();
const courseController = new CourseController();

export const TutorCourseForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const location = useLocation();
  const initValues = {
    coaching: "",
    class: "",
    subject: "",
    start: "",
    days: "",
    time: "",
    seats: "",
  };
  const [values, setValues] = useState(initValues);
  const setList = async () => {
    const result = await coachingController.getMyList();
    setCoachingsList(result.data);
  };
  useEffect(() => {
    setList();
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCourse = async (event) => {
    console.log(values);
    const result = await courseController.create(values);
    if (result.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
    // if (result.success) location.reload();
  };
  return (
    <div className="course-form">
      <h1 className="header">New Course</h1>
      <Divider />
      <div className="input-fields">
        <FormControl fullWidth className="input-field" variant="outlined">
          <InputLabel htmlFor="outlined-adornment" className="input-label">
            {"Coaching"}
          </InputLabel>

          <Select
            required
            id="outlined-adornment"
            className="outlined-input"
            value={values.coaching}
            onChange={handleChange("coaching")}
            input={<OutlinedInput label="Coaching" />}
            // MenuProps={MenuProps}
          >
            {coachingsList !== undefined ? (
              coachingsList.map((coaching) => (
                <MenuItem key={coaching.NAME} value={coaching.COACHING_ID}>
                  {coaching.NAME}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
        {[
          {
            label: "Class",
            id: "class",
            value: values.class,
          },
          {
            label: "Subject",
            id: "subject",
            value: values.subject,
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
        onClick={createCourse}
      >
        Create
      </Button>
    </div>
  );
};

export const BatchSelectionField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {"Batch"}
      </InputLabel>

      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange("batch")}
        input={<OutlinedInput label="Batch" />}
        // MenuProps={MenuProps}
      >
        {props.batchList !== undefined ? (
          props.batchList.map((batch, index) => (
            <MenuItem key={batch.BATCH_ID} value={batch.BATCH_ID}>
              {`Batch ${index + 1}: `}
              <br></br>
              {`Starting date:  ${format(
                new Date(batch.START_DATE),
                "do MMMM, yyyy"
              )}`}
              <br></br>
              {`Days: ${batch.CLASS_DAYS}`}
              <br></br>
              {`Time: ${batch.CLASS_TIME}`}
              <br></br>
              {`Total seats: ${batch.SEATS}`}
            </MenuItem>
          ))
        ) : (
          <></>
        )}
      </Select>
    </FormControl>
  );
};
export const CoachingSelectionField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {"Coaching"}
      </InputLabel>

      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange("coaching")}
        input={<OutlinedInput label="Coaching" />}
        // MenuProps={MenuProps}
      >
        {props.coachingsList !== undefined ? (
          props.coachingsList.map((coaching) => (
            <MenuItem key={coaching.NAME} value={coaching.COACHING_ID}>
              {coaching.NAME}
            </MenuItem>
          ))
        ) : (
          <></>
        )}
      </Select>
    </FormControl>
  );
};

export const StudentCourseForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([
    // { NAME: "None", COACHING_ID: -1 },
  ]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const initValues = {
    coaching: "",
    class: "",
    subject: "",
    batch: "",
  };
  const [values, setValues] = useState(initValues);
  const setCoachingOptions = async () => {
    var result = await coachingController.getMyList();
    setCoachingsList(result.data);
  };
  const setBatchOptions = async () => {
    var result = await courseController.getBatchOptions(
      values.coaching,
      values.class,
      values.subject
    );
    console.log("Batches", result.data);
    setBatchList(result.data);
  };
  const setClassOptions = async () => {
    const result = await courseController.getClassOptions(values.coaching);
    const list = [];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i].CLASS);
    }
    // console.log(result.data) ;
    setClassList(list);
  };
  const setSubjectOptions = async () => {
    const result = await courseController.getSubjectOptions(
      values.coaching,
      values.class
    );
    const list = [];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i].SUBJECT);
    }
    setSubjectList(list);
  };
  useEffect(() => {
    setCoachingOptions();
    // console.log("COaching list: ", coachingsList);
  }, []);
  useEffect(() => {
    if (values.coaching !== "") setClassOptions();
  }, [values.coaching]);
  useEffect(() => {
    if (values.class !== "") setSubjectOptions();
  }, [values.class]);
  useEffect(() => {
    if (values.subject !== "") setBatchOptions();
  }, [values.subject]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const enrollCourse = async (event) => {
    const course = await courseController.getCourseId(
      values.coaching,
      values.class,
      values.subject
    );
    console.log("ID", course);
    const result = await courseController.enroll(
      course.data.COURSE_ID,
      values.batch
    );
    if (result.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
      setClassList([]);
      setSubjectList([]);
      setBatchList([]);
    }
  };
  return (
    <div className="course-form">
      <h1 className="header">New Course</h1>
      <Divider />
      <div className="input-fields">
        <CoachingSelectionField
          coachingsList={coachingsList}
          value={values.coaching}
          onChange={handleChange}
        />
        {[
          {
            label: "Class",
            id: "class",
            value: values.class,
            list: classList,
          },
          {
            label: "Subject",
            id: "subject",
            value: values.subject,
            list: subjectList,
          },
        ].map((field, index) => (
          <SelectionField
            label={field.label}
            value={field.value}
            id={field.id}
            onChange={handleChange}
            list={field.list}
          ></SelectionField>
        ))}
        <BatchSelectionField
          batchList={batchList}
          value={values.batch}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        className="create-button"
        onClick={enrollCourse}
      >
        Enroll
      </Button>
    </div>
  );
};

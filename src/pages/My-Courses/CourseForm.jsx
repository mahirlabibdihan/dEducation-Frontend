import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import Select from "@mui/material/Select";
import { InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import "./my-courses.scss";
import SelectionField from "../../components/SelectionField";
import { FormControl } from "@mui/material";
import { useContext } from "react";
import { format } from "date-fns";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();
const courseController = new CourseController();

export const TutorCourseForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
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
    const res = await coachingController.getMyList();
    setCoachingsList(res.data);
  };
  useEffect(() => {
    setList();
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCourse = async (event) => {
    console.log(values);
    const res = await courseController.create(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
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
        {/* <SelectionField
          label="Class"
          value={values.class}
          id="class"
          onChange={handleChange}
          list={Fields.class}
        ></SelectionField>
        <SelectionField
          label="Subject"
          value={values.subject}
          id="subject"
          onChange={handleChange}
          list={Fields.subject}
        ></SelectionField> */}
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
      {values.coaching === "" ||
      values.class === "" ||
      values.subject === "" ? (
        <Button
          variant="contained"
          className="create-button disabled-button"
          onClick={createCourse}
          disabled
        >
          Create
        </Button>
      ) : (
        <Button
          variant="contained"
          className="create-button"
          onClick={createCourse}
        >
          Create
        </Button>
      )}
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
    var res = await coachingController.getMyList();
    setCoachingsList(res.data);
  };
  const setBatchOptions = async () => {
    var res = await courseController.getBatchOptions(
      values.coaching,
      values.class,
      values.subject
    );
    setBatchList(res.data);
  };
  const setClassOptions = async () => {
    const res = await courseController.getClassOptions(values.coaching);
    const list = [];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setClassList(list);
  };
  const setSubjectOptions = async () => {
    const res = await courseController.getSubjectOptions(
      values.coaching,
      values.class
    );
    const list = [];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setSubjectList(list);
  };
  useEffect(() => {
    setCoachingOptions();
  }, []);
  useEffect(() => {
    setValues({
      coaching: values.coaching,
      class: "",
      subject: "",
      batch: "",
    });
    if (values.coaching !== -1) {
      setClassOptions();
    } else {
      setClassList([]);
    }
    setSubjectList([]);
    setBatchList([]);
  }, [values.coaching]);
  useEffect(() => {
    setValues({
      coaching: values.coaching,
      class: values.class,
      subject: "",
      batch: "",
    });
    if (values.class !== "") {
      setSubjectOptions();
    } else {
      setSubjectList([]);
    }
    setBatchList([]);
  }, [values.class]);
  useEffect(() => {
    setValues({
      coaching: values.coaching,
      class: values.class,
      subject: values.subject,
      batch: "",
    });
    if (values.subject !== "") {
      setBatchOptions();
    } else {
      setBatchList([]);
    }
  }, [values.subject]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const enrollCourse = async (event) => {
    const res = await courseController.enroll(values.batch);
    if (res.success) {
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
      {values.batch === "" ? (
        <Button
          variant="contained"
          className="create-button disabled-button"
          onClick={enrollCourse}
          disabled
        >
          Enroll
        </Button>
      ) : (
        <Button
          variant="contained"
          className="create-button"
          onClick={enrollCourse}
        >
          Enroll
        </Button>
      )}
    </div>
  );
};

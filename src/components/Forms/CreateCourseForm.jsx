import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { CreateCourseFields } from "../../components/InputFields";
import { RestrictedButton } from "../Buttons";
import { Zoom } from "@mui/material";
import Confirmation from "../Cards/Confirmation";
import "./styles.scss";
const coachingController = new CoachingController();
const courseController = new CourseController();
const CreateCourseForm = () => {
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
  const [open, setOpen] = useState(false);
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
    const res = await courseController.create(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <Zoom in={true}>
      <div className="course-form">
        <h1 className="header">New Course</h1>
        <Divider />
        <CreateCourseFields
          values={values}
          coachingsList={coachingsList}
          handleChange={handleChange}
        />
        <RestrictedButton
          isDisabled={
            values.coaching === "" ||
            values.class === "" ||
            values.subject === ""
          }
          onClick={() => setOpen(true)}
          label="Create"
        />
        <Confirmation open={open} setOpen={setOpen} onConfirm={createCourse} />
      </div>
    </Zoom>
  );
};

export default CreateCourseForm;

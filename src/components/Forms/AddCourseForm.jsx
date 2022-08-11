import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { AddCourseFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import CourseSelectionForm from "./CourseSelectionForm";
import "./styles.scss";
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
const AddCourseForm = () => {
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

  useEffect(() => {
    setCoachingOptions();
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  /*==========================*/
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
      <CourseSelectionForm
        values={values}
        setValues={setValues}
        coachingsList={coachingsList}
        setCoachingOptions={setCoachingOptions}
        classList={classList}
        setClassList={setClassList}
        subjectList={subjectList}
        setSubjectList={setSubjectList}
        batchList={batchList}
        setBatchList={setBatchList}
        handleChange={handleChange}
      />
      <RestrictedButton
        isDisabled={values.batch === ""}
        onClick={enrollCourse}
        label="Enroll"
      />
    </div>
  );
};

export default AddCourseForm;

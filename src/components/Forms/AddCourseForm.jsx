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
import { Zoom } from "@mui/material";
import Confirmation from "../Cards/Confirmation";
import "./styles.scss";
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
const AddCourseForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [button, setButton] = useState("Disabled");
  const [coachingsList, setCoachingsList] = useState([
    // { NAME: "None", COACHING_ID: -1 },
  ]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [open, setOpen] = useState(false);
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
    setButton("Disabled");
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
      setButton("Disabled");
    }
  };
  const cancelEnroll = async (event) => {
    const res = await courseController.cancelEnrollment(values.batch);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
      setClassList([]);
      setSubjectList([]);
      setBatchList([]);
      setButton("Disabled");
    }
  };
  return (
    <Zoom in={true}>
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
          setButton={setButton}
          button={button}
        />
        {button === "Cancel" ? (
          <Button
            variant="contained"
            className="red-button horizontal-center full-width"
            onClick={cancelEnroll}
          >
            Cancel
          </Button>
        ) : button === "Enrolled" ? (
          <Button
            variant="contained"
            className="disabled-button full-width"
            disabled
          >
            Enrolled
          </Button>
        ) : (
          <RestrictedButton
            isDisabled={values.batch === ""}
            onClick={() => setOpen(true)}
            label="Enroll"
          />
        )}
        <Confirmation open={open} setOpen={setOpen} onConfirm={enrollCourse} />
      </div>
    </Zoom>
  );
};

export default AddCourseForm;

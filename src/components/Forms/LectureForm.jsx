import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { AddCourseFields, CreateNoticeFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import { CourseSelectionFields } from "../InputFields";
import CourseSelectionForm from "./CourseSelectionForm";
import { MultiLineField } from "../InputFields";
import "./styles.scss";
import { Zoom } from "@mui/material";
import Cookies from "universal-cookie";
import TutorsController from "../../controller/tutorsController";
import { UploadLectureFields } from "../InputFields";
const tutorsController = new TutorsController();
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
const LectureForm = () => {
  const cookies = new Cookies();
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
  const initValues = {
    description: "",
    link: "",
  };
  const [values, setValues] = useState(initValues);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  /*==========================*/
  const uploadLecture = async (event) => {
    const res = await tutorsController.uploadLecture(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <Zoom in={true}>
      <div className="course-form">
        <h1 className="header">New Lecture</h1>
        <Divider />
        <div className="notice-form-fields">
          <UploadLectureFields values={values} handleChange={handleChange} />
        </div>

        <RestrictedButton
          isDisabled={values.link === ""}
          onClick={uploadLecture}
          label="Upload"
        />
      </div>
    </Zoom>
  );
};

export default LectureForm;

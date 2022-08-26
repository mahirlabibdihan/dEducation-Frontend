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
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
const NoticeForm = () => {
  const cookies = new Cookies();
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
  const [coachingsList, setCoachingsList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const initValues = {
    coaching: "",
    class: "",
    subject: "",
    batch: "",
    notice: "",
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
  const postNotice = async (event) => {
    const res = await coachingController.postNotice(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
      setClassList([]);
      setSubjectList([]);
      setBatchList([]);
    }
  };
  return (
    <Zoom in={true}>
      <div className="course-form">
        <h1 className="header">New Notice</h1>
        <Divider />
        <div className="notice-form-fields">
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
          <MultiLineField
            rows={8}
            label={"Notice"}
            type="text"
            value={values.notice}
            id={"notice"}
            onChange={handleChange}
          />
        </div>

        <RestrictedButton
          isDisabled={
            values.coaching === -1 ||
            values.class === "" ||
            values.subject === "" ||
            values.notice === "" ||
            values.notice === undefined
          }
          onClick={postNotice}
          label="Post"
        />
      </div>
    </Zoom>
  );
};

export default NoticeForm;

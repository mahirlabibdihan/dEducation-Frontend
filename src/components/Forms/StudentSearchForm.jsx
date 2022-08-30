import React, { useState, useEffect, useContext } from "react";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
import Zoom from "@mui/material/Zoom";
import { RestrictedButton } from "../Buttons";
import "./styles.scss";
import { StudentTypeField, CourseSelectionFields } from "../InputFields";
const coachingController = new CoachingController();
const courseController = new CourseController();
const StudentSearchForm = () => {
  /*==========================*/
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const initValues = () => ({
    student_type:
      searchParams.get("type") === null
        ? "Accepted Tution"
        : searchParams.get("type"),
    coaching:
      searchParams.get("coaching") === null ? "" : searchParams.get("coaching"),
    class: searchParams.get("class") === null ? "" : searchParams.get("class"),
    subject:
      searchParams.get("subject") === null ? "" : searchParams.get("subject"),
    batch: searchParams.get("batch") === null ? "" : searchParams.get("batch"),
  });
  const [values, setValues] = useState(initValues());
  const setCoachingOptions = async () => {
    var res = await coachingController.getMyList();
    const list = [];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setCoachingsList(list);
  };
  useEffect(() => {
    setValues(initValues());
  }, []);

  useEffect(() => {
    if (
      values.student_type === "Coaching Member" ||
      values.student_type === "Course Enrolled"
    ) {
      setCoachingOptions();
    }
  }, [values.student_type]);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = async (event) => {
    const tmp = new URLSearchParams();
    tmp.set("type", values.student_type);
    if (
      values.student_type === "Coaching Member" ||
      values.student_type === "Course Enrolled"
    ) {
      if (values.coaching !== "") {
        tmp.set("coaching", values.coaching);
      }
      if (values.student_type === "Course Enrolled") {
        if (values.class !== "") {
          tmp.set("class", values.class);
        }
        if (values.subject !== "") {
          tmp.set("subject", values.subject);
        }
        if (values.batch !== "") {
          tmp.set("batch", values.batch);
        }
      }
    }
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
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
    setClassList(res.data);
  };
  const setSubjectOptions = async () => {
    const res = await courseController.getSubjectOptions(
      values.coaching,
      values.class
    );
    setSubjectList(res.data);
  };
  useEffect(() => {
    setValues({
      student_type: values.student_type,
      coaching: "",
      class: "",
      subject: "",
      batch: "",
    });
    if (values.student_type === "Accepted Tution") setCoachingsList([]);
    setClassList([]);
    setSubjectList([]);
    setBatchList([]);
  }, [values.student_type]);
  useEffect(() => {
    setValues({
      student_type: values.student_type,
      coaching: values.coaching,
      class: "",
      subject: "",
      batch: "",
    });
    if (values.student_type === "Course Enrolled" && values.coaching !== "") {
      setClassOptions();
    } else {
      setClassList([]);
    }
    setSubjectList([]);
    setBatchList([]);
  }, [values.coaching]);
  useEffect(() => {
    setValues({
      student_type: values.student_type,
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
      student_type: values.student_type,
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
  /*==========================*/
  //   console.log(values);
  return (
    <Zoom in={true}>
      <div className="student-search">
        <StudentTypeField
          value={values.student_type}
          handleChange={handleChange}
        />
        <CourseSelectionFields
          values={values}
          coachingsList={coachingsList}
          classList={classList}
          subjectList={subjectList}
          batchList={batchList}
          handleChange={handleChange}
        />
        <RestrictedButton
          isDisabled={
            (values.student_type === "Coaching Member" &&
              values.coaching === "") ||
            (values.student_type === "Course Enrolled" &&
              (values.coaching === "" ||
                values.class === "" ||
                values.subject === ""))
          }
          onClick={handleSearch}
          label="Apply"
        />
      </div>
    </Zoom>
  );
};
export default StudentSearchForm;

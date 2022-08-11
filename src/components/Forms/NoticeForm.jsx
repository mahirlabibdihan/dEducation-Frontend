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
import "./styles.scss";
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
const NoticeForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([
    // { NAME: "Tution", COACHING_ID: -1 },
  ]);
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
  /*==========================*/
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
    setCoachingOptions();
  }, []);
  useEffect(() => {
    setValues({
      coaching: values.coaching,
      class: "",
      subject: "",
      batch: "",
      notice: "",
    });
    if (values.coaching !== -1 || values.coaching !== "") {
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
      notice: "",
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
      notice: "",
    });
    if (values.subject !== "") {
      setBatchOptions();
    } else {
      setBatchList([]);
    }
  }, [values.subject]);
  /*==========================*/

  const setCoachingOptions = async () => {
    var res = await coachingController.getMyList();
    const list = [
      /*{ NAME: "Tution", COACHING_ID: -1 }*/
    ];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setCoachingsList(list);
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
      <h1 className="header">New Notice</h1>
      <Divider />
      <CreateNoticeFields
        values={values}
        coachingsList={coachingsList}
        classList={classList}
        subjectList={subjectList}
        batchList={batchList}
        handleChange={handleChange}
      />
      <RestrictedButton
        isDisabled={values.notice === ""}
        onClick={enrollCourse}
        label="Post"
      />
    </div>
  );
};

export default NoticeForm;

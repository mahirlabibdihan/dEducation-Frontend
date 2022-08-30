import React, { useEffect } from "react";
import CourseController from "../../controller/courseController";
import { CourseSelectionFields } from "../InputFields";
import Cookies from "universal-cookie";
import "./styles.scss";
import ProfileController from "../../controller/profileController";
const courseController = new CourseController();
const cookies = new Cookies();
const profileController = new ProfileController();
const CourseSelectionForm = ({
  values,
  setValues,
  coachingsList,
  setCoachingOptions,
  classList,
  setClassList,
  subjectList,
  setSubjectList,
  batchList,
  setBatchList,
  handleChange,
  setButton,
  button,
}) => {
  /*==========================*/
  const type = cookies.get("type");
  const setBatchOptions = async () => {
    var res = await courseController.getBatchOptions(
      values.coaching,
      values.class,
      values.subject
    );
    setBatchList(res.data);
    if (button !== undefined) {
      if (res.success) {
        if (res.data.length === 1) {
          if (res.data[0].STATUS === "PENDING") {
            setButton("Cancel");
            setValues({ ...values, batch: res.data[0].BATCH_ID });
          } else if (res.data[0].STATUS === "APPROVED") {
            setButton("Enrolled");
            setValues({ ...values, batch: res.data[0].BATCH_ID });
          } else {
            setButton("Enroll");
          }
        }
      }
    }
  };
  const setClassOptions = async () => {
    if (type === "STUDENT") {
      const res = await profileController.getProfile();
      setClassList([res.data.CLASS]);
      setValues({
        coaching: values.coaching,
        class: res.data.CLASS,
        subject: "",
        batch: "",
      });
    } else {
      const res = await courseController.getClassOptions(values.coaching);
      setClassList(res.data);
    }
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
    });
    if (values.coaching !== -1 && values.coaching !== "") {
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
  /*==========================*/

  return (
    <CourseSelectionFields
      values={values}
      coachingsList={coachingsList}
      classList={classList}
      subjectList={subjectList}
      batchList={batchList}
      handleChange={handleChange}
    />
  );
};

export default CourseSelectionForm;

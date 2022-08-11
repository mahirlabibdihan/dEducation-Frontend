import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { AddCourseFields } from "../InputFields";
import { RestrictedButton } from "../Buttons";
import { CourseSelectionFields } from "../InputFields";
import "./styles.scss";
// import SelectionField from "../../components/SelectionField";
const coachingController = new CoachingController();
const courseController = new CourseController();
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
}) => {
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

import React, { useState, useEffect, useContext } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import SelectionField from "../../components/SelectionField";
import {
  CoachingSelectionField,
  BatchSelectionField,
} from "../My-Courses/CourseForm";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();
const courseController = new CourseController();
const SearchBox = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([
    { NAME: "Tution", COACHING_ID: -1 },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [coaching, setCoaching] = useState();
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [values, setValues] = useState({
    coaching: -1,
    class: "",
    subject: "",
    batch: "",
  });
  const setCoachingOptions = async () => {
    var result = await coachingController.getMyList();
    const list = [{ NAME: "Tution", COACHING_ID: -1 }];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i]);
    }
    setCoachingsList(list);
  };
  const setBatchOptions = async () => {
    var result = await courseController.getBatchOptions(
      values.coaching,
      values.class,
      values.subject
    );
    // const list = [{ NAME: "Tution", BATCH_ID: -1 }];
    const list = [];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i]);
    }
    setBatchList(list);
  };
  const setClassOptions = async () => {
    const result = await courseController.getClassOptions(values.coaching);
    const list = [""];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i].CLASS);
    }
    // console.log(result.data) ;
    setClassList(list);
  };
  const setSubjectOptions = async () => {
    const result = await courseController.getSubjectOptions(
      values.coaching,
      values.class
    );
    const list = [""];
    for (let i = 0; i < result.data.length; i++) {
      list.push(result.data[i].SUBJECT);
    }
    setSubjectList(list);
  };
  useEffect(() => {
    setCoachingOptions();
    // console.log("COaching list: ", coachingsList);
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
    if (values.class !== "") setSubjectOptions();
    else {
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
    if (values.subject !== "") setBatchOptions();
    else {
      setBatchList([]);
    }
  }, [values.subject]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = async (event) => {
    let result;
    console.log(values);
    const tmp = new URLSearchParams();
    if (values.coaching !== -1) {
      tmp.set("coaching", values.coaching);
    }
    if (values.class !== "") {
      tmp.set("class", values.class);
    }
    if (values.subject !== "") {
      tmp.set("subject", values.subject);
    }
    if (values.batch !== "") {
      tmp.set("batch", values.batch);
    }
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
  };
  return (
    <div className="course-form">
      <h1 className="header">Filter</h1>
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
      <Button
        variant="contained"
        className="apply-button"
        onClick={handleSearch}
      >
        Apply
      </Button>
    </div>
  );
};
/*const SearchBox = () => {
  const [values, setValues] = useState({
    type: "",
    desired_tutor_gender: "",
    subjects: "",
    days_per_week: "",
    salary: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Location",
            id: "type",
            value: values.type,
          },
          {
            label: "Salary",
            id: "days_per_week",
            value: values.days_per_week,
          },
          {
            label: "Class",
            id: "subjects",
            value: values.subjects,
          },
          {
            label: "Subjects",
            id: "subjects",
            value: values.subjects,
          },
          {
            label: "Gender",
            id: "desired_tutor_gender",
            value: values.desired_tutor_gender,
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
      <Button variant="contained" className="apply-button">
        Apply
      </Button>
    </div>
  );
};*/

export default SearchBox;

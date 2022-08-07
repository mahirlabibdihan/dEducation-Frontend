import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
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
    var res = await coachingController.getMyList();
    const list = [{ NAME: "Tution", COACHING_ID: -1 }];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setCoachingsList(list);
    // const coaching_id = searchParams.get("coaching");
    // const class_name = searchParams.get("class");
    // const subject = searchParams.get("subject");
    // const batch = searchParams.get("batch");
    // console.log("BATCH: ", batch);
    // if (coaching_id !== null) {
    //   if (coachingsList.length > 1)
    //     setValues({ ...values, coaching: coaching_id });
    //   if (class_name !== null) {
    //     await setClassOptions();
    //     if (classList.length > 0) setValues({ ...values, class: class_name });
    //     if (subject !== null) {
    //       await setSubjectOptions();
    //       if (subjectList.length > 0)
    //         setValues({ ...values, subject: subject });
    //       if (batch !== null) {
    //         await setBatchOptions();
    //         if (batchList.length > 0) setValues({ ...values, batch: batch });
    //       }
    //     }
    //   }
    // }
    // setValues({ ...values, class: class_name === null ? "" : class_name });
    // setValues({ ...values, subject: subject === null ? "" : subject });
    // setValues({ ...values, batch: batch === null ? "" : batch });
    // setValues({
    //   coaching: coaching_id === null ? -1 : coaching_id,
    //   class: class_name === null ? "" : class_name,
    //   subject: subject === null ? "" : subject,
    //   batch: batch === null ? "" : batch,
    // });
  };
  const setBatchOptions = async () => {
    var res = await courseController.getBatchOptions(
      values.coaching,
      values.class,
      values.subject
    );
    // const list = [{ NAME: "Tution", BATCH_ID: -1 }];
    const list = [];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setBatchList(list);
  };
  const setClassOptions = async () => {
    const res = await courseController.getClassOptions(values.coaching);
    const list = [""];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    // console.log(res.data) ;
    setClassList(list);
  };
  const setSubjectOptions = async () => {
    const res = await courseController.getSubjectOptions(
      values.coaching,
      values.class
    );
    const list = [""];
    for (let i = 0; i < res.data.length; i++) {
      list.push(res.data[i]);
    }
    setSubjectList(list);
  };
  useEffect(() => {
    if (coachingsList.length === 1) setCoachingOptions();
  }, []);
  useEffect(() => {
    console.log("Update", values.coaching);
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
export default SearchBox;

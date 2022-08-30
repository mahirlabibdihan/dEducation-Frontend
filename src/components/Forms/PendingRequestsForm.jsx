import React, { useState, useEffect } from "react";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { RestrictedButton } from "../Buttons";
import { CourseSelectionFields } from "../InputFields";
import { useSearchParams } from "react-router-dom";
import "./styles.scss";
import { RequestTypeField } from "../InputFields";
import Zoom from "@mui/material/Zoom";
const coachingController = new CoachingController();
const courseController = new CourseController();
const PendingRequestsForm = () => {
  /*==========================*/
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const initValues = () => ({
    request_type:
      searchParams.get("type") === null
        ? "Tution Offer"
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
      values.request_type === "Join Request" ||
      values.request_type === "Course Enroll"
    ) {
      setCoachingOptions();
    }
  }, [values.request_type]);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = async (event) => {
    const tmp = new URLSearchParams();
    tmp.set("type", values.request_type);
    if (
      values.request_type === "Join Request" ||
      values.request_type === "Course Enroll"
    ) {
      if (values.coaching !== "") {
        tmp.set("coaching", values.coaching);
      }
      if (values.request_type === "Course Enroll") {
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
      request_type: values.request_type,
      coaching: "",
      class: "",
      subject: "",
      batch: "",
    });
    if (values.request_type === "Tution Offer") setCoachingsList([]);
    setClassList([]);
    setSubjectList([]);
    setBatchList([]);
  }, [values.request_type]);
  useEffect(() => {
    setValues({
      request_type: values.request_type,
      coaching: values.coaching,
      class: "",
      subject: "",
      batch: "",
    });
    if (values.request_type === "Course Enroll" && values.coaching !== "") {
      setClassOptions();
    } else {
      setClassList([]);
    }
    setSubjectList([]);
    setBatchList([]);
  }, [values.coaching]);
  useEffect(() => {
    setValues({
      request_type: values.request_type,
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
      request_type: values.request_type,
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
        {/* <h1 className="adeher">Filter</h1>
      <Divider /> */}
        <RequestTypeField
          value={values.request_type}
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
            (values.request_type === "Join Request" &&
              values.coaching === "") ||
            (values.request_type === "Course Enroll" &&
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
export default PendingRequestsForm;

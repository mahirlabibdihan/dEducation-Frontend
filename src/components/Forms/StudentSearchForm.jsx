import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CoachingController from "../../controller/coachingController";
import CourseController from "../../controller/courseController";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
import CourseSelectionForm from "./CourseSelectionForm";
import { Zoom } from "@mui/material";
import "./styles.scss";
const coachingController = new CoachingController();
const courseController = new CourseController();
const StudentSearchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([
    { NAME: "Tution", COACHING_ID: -1 },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
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
  };
  useEffect(() => {
    if (coachingsList.length === 1) setCoachingOptions();
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = async (event) => {
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
    <Zoom in={true}>
      <div className="student-search">
        <h1 className="header">Filter</h1>
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
        />
        <Button
          variant="contained"
          className="blue-button full-width"
          onClick={handleSearch}
        >
          Apply
        </Button>
      </div>
    </Zoom>
  );
};
export default StudentSearchForm;

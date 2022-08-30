import React, { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import CoachingController from "../../controller/coachingController";
import GlobalContext from "../../store/GlobalContext";
import { RestrictedButton } from "../Buttons";
import CourseSelectionForm from "./CourseSelectionForm";
import { MultiLineField } from "../InputFields";
import "./styles.scss";
import Confirmation from "../Cards/Confirmation";
import Zoom from "@mui/material/Zoom";
const coachingController = new CoachingController();
const NoticeForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [open, setOpen] = useState(false);
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
          onClick={() => setOpen(true)}
          label="Post"
        />
        <Confirmation open={open} setOpen={setOpen} onConfirm={postNotice} />
      </div>
    </Zoom>
  );
};

export default NoticeForm;

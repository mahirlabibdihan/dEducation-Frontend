import React, { useState, useContext } from "react";
import Divider from "@mui/material/Divider";
import GlobalContext from "../../store/GlobalContext";
import { RestrictedButton } from "../Buttons";
import "./styles.scss";
import Zoom from "@mui/material/Zoom";
import TutorsController from "../../controller/tutorsController";
import { UploadLectureFields } from "../InputFields";
import Confirmation from "../Cards/Confirmation";
const tutorsController = new TutorsController();
const LectureForm = () => {
  const globalCtx = useContext(GlobalContext);
  const initValues = {
    description: "",
    link: "",
  };
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initValues);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  /*==========================*/
  const uploadLecture = async (event) => {
    const res = await tutorsController.uploadLecture(values);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
      setValues(initValues);
    }
  };
  return (
    <Zoom in={true}>
      <div className="course-form">
        <h1 className="header">New Lecture</h1>
        <Divider />
        <div className="notice-form-fields">
          <UploadLectureFields values={values} handleChange={handleChange} />
        </div>

        <RestrictedButton
          isDisabled={values.link === ""}
          onClick={() => setOpen(true)}
          label="Upload"
        />
        <Confirmation open={open} setOpen={setOpen} onConfirm={uploadLecture} />
      </div>
    </Zoom>
  );
};

export default LectureForm;

import React, { useState } from "react";
import { Divider } from "@mui/material";
import { InputField2, NumberField } from "../../components/InputField";
import { Button } from "@mui/material";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import Fields from "../../components/Fields";
import SelectionField from "../../components/SelectionField";
const tutionController = new TutionController();
const RequestForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState({
    type: "Offline",
    desired_tutor_gender: "Any",
    subjects: "",
    days_per_week: 1,
    salary: 0,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePost = async (event) => {
    const res = await tutionController.post({
      type: values.type,
      desired_tutor_gender: values.desired_tutor_gender,
      subjects: values.subjects,
      days_per_week: values.days_per_week,
      salary: values.salary,
    });
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  return (
    <div className="request-form">
      <h1 className="header"> Need a tutor? </h1>
      <Divider />
      <div className="input-fields">
        <SelectionField
          label="Tuition Type"
          value={values.type}
          id="type"
          onChange={handleChange}
          list={Fields.tution_type}
        ></SelectionField>
        <SelectionField
          label="Desired Tutor Gender"
          value={values.desired_tutor_gender}
          id="desired_tutor_gender"
          onChange={handleChange}
          list={["Any", "Male", "Female"]}
        ></SelectionField>
        {/* <MultiSelectionField
          label="Subjects"
          value={values.subjects}
          id="subjects"
          onChange={handleChange}
          list={Fields.subject}
        ></MultiSelectionField> */}
        <InputField2
          label="Subjects"
          type="text"
          value={values.subjects}
          id="subjects"
          onChange={handleChange}
        />
        <NumberField
          label="Days / Week"
          min={1}
          max={7}
          step={1}
          value={values.days_per_week}
          id="days_per_week"
          onChange={handleChange}
        />
        <NumberField
          label="Salary (BDT)"
          type="number"
          min={0}
          max={100000}
          step={1000}
          value={values.salary}
          id="salary"
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" className="post-button" onClick={handlePost}>
        Post
      </Button>
    </div>
  );
};

export default RequestForm;

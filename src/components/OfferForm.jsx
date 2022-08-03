import React, { useState, useContext, useEffect } from "react";
import InputField, { InputField2, NumberField } from "./InputField";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../controller/tutionController";
import GlobalContext from "../store/GlobalContext";
import SelectionField, { MultiSelectionField } from "./SelectionField";
import Fields from "./Fields";
import { showToast } from "../App";
const tutionController = new TutionController();

const OfferForm = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState(
    props.tution === undefined
      ? {
          type: "Offline",
          desired_tutor_gender: "Male",
          subjects: "",
          days_per_week: 1,
          salary: 0,
        }
      : {
          type: props.tution.TYPE,
          desired_tutor_gender: props.tution.DESIRED_TUTOR_GENDER,
          subjects: props.tution.SUBJECTS,
          days_per_week: props.tution.DAYS_PER_WEEK,
          salary: props.tution.SALARY,
        }
  );
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const tutorRequestForm = [
    {
      label: "Subjects",
      id: "subjects",
      value: values.subjects,
    },
    {
      label: "Salary (BDT)",
      id: "salary",
      value: values.salary,
    },
  ];
  const handleOffer = async (event) => {
    const result = await tutionController.offer(
      {
        type: values.type,
        subjects: values.subjects,
        days_per_week: values.days_per_week,
        salary: values.salary,
      },
      props.tutor_id
    );
    if (result.success) {
      showToast("Tution offered", "success");
      globalCtx.setPendingUpdate(true);
      globalCtx.setSelectedIndex(-1);
    }
  };
  return (
    <div className="offer-form">
      <div className="input-fields">
        <SelectionField
          label="Tuition Type"
          value={values.type}
          id="type"
          onChange={handleChange}
          list={Fields.tution_type}
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
        {/* <SelectionField
          label="Days / Week"
          value={values.days_per_week}
          id="days_per_week"
          onChange={handleChange}
          list={Fields.days_per_week}
        ></SelectionField> */}
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
      <Button
        variant="contained"
        className="offer-button"
        onClick={handleOffer}
      >
        Offer
      </Button>
    </div>
  );
};

export default OfferForm;

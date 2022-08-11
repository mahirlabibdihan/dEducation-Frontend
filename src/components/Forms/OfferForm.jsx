import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { TutionOfferFields } from "../InputFields";
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
  const handleOffer = async (event) => {
    const res = await tutionController.offer(
      {
        type: values.type,
        subjects: values.subjects,
        days_per_week: values.days_per_week,
        salary: values.salary,
      },
      props.tutor_id
    );
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  return (
    <div className="offer-form">
      <TutionOfferFields values={values} handleChange={handleChange} />
      <Button
        variant="contained"
        className="blue-button full-width"
        onClick={handleOffer}
      >
        Offer
      </Button>
    </div>
  );
};

export default OfferForm;

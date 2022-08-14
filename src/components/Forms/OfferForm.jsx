import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { TutionOfferFields } from "../InputFields";
import { format } from "date-fns";
const tutionController = new TutionController();

const OfferForm = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [values, setValues] = useState(
    props.tution === undefined
      ? {
          tution_type: "Offline",
          desired_tutor_gender: "Male",
          subjects: "",
          start_date: new Date(),
          days: [],
          class_time: new Date("2014-08-18T00:00:00"),
          salary: 0,
        }
      : {
          tution_type: props.tution.TYPE,
          desired_tutor_gender: props.tution.DESIRED_TUTOR_GENDER,
          subjects: props.tution.SUBJECTS,
          start_date: new Date(),
          days: [],
          class_time: new Date("2014-08-18T00:00:00"),
          salary: props.tution.SALARY,
        }
  );
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleOffer = async (event) => {
    const res = await tutionController.offer(
      {
        days: values.days.toString(),
        type: values.tution_type,
        subjects: values.subjects,
        start_date: format(values.start_date, "MM/dd/yyyy"),
        class_days: values.days.toString(),
        class_time: format(values.class_time, "h:mm a"),
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
      <TutionOfferFields
        values={values}
        setValues={setValues}
        handleChange={handleChange}
      />
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

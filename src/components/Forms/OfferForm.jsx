import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { TutionOfferFields } from "../InputFields";
import { format } from "date-fns";
import { useEffect } from "react";
import { RestrictedButton } from "../Buttons";
const tutionController = new TutionController();

const OfferForm = (props) => {
  const globalCtx = useContext(GlobalContext);
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  const initValues = () => {
    const tution =
      props.tution === undefined
        ? {
            tution_type: "Offline",
            subjects: [],
            start_date: new Date(),
            days: [],
            start_time: new Date(),
            end_time: new Date(),
            salary: 0,
          }
        : {
            tution_type:
              props.tution.TYPE === null ? "Offline" : props.tution.TYPE,
            subjects:
              props.tution.SUBJECTS === null
                ? []
                : props.tution.SUBJECTS.split(", "),
            start_date:
              props.tution.START_DATE === null
                ? new Date()
                : new Date(props.tution.START_DATE),
            days:
              props.tution.CLASS_DAYS === null
                ? []
                : props.tution.CLASS_DAYS.split(", "),
            start_time:
              props.tution.START_TIME.slice(0, -1) === null
                ? new Date()
                : new Date(props.tution.START_TIME.slice(0, -1)),
            end_time:
              props.tution.END_TIME.slice(0, -1) === null
                ? new Date()
                : new Date(props.tution.END_TIME.slice(0, -1)),
            salary: props.tution.SALARY === null ? 0 : props.tution.SALARY,
          };

    return tution;
  };
  const [values, setValues] = useState(initValues());
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    setValues({
      ...values,
      end_time: Math.max(values.start_time, values.end_time),
    });
  }, [values.start_time]);
  const handleOffer = async (event) => {
    let res;
    if (props.post === undefined) {
      res = await tutionController.offer(
        {
          type: values.tution_type,
          subjects: values.subjects.join(", "),
          start_date: format(values.start_date, "MM/dd/yyyy"),
          class_days: values.days.join(", "),
          start_time: format(values.start_time, "HH:mm:ss"),
          end_time: format(values.end_time, "HH:mm:ss"),
          salary: values.salary,
        },
        props.tutor.USER_ID
      );
    } else {
      res = await tutionController.postOffer(
        {
          type: values.tution_type,
          subjects: values.subjects.join(", "),
          start_date: format(values.start_date, "MM/dd/yyyy"),
          class_days: values.days.join(", "),
          start_time: format(values.start_time, "HH:mm:ss"),
          end_time: format(values.end_time, "HH:mm:ss"),
          salary: values.salary,
        },
        props.tutor.USER_ID,
        props.post
      );
    }

    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  useEffect(() => {
    setValues(initValues());
  }, [props]);
  // console.log(format(new Date("2022-08-01 13:00:00"), "h:mm a"));
  // console.log(new Date());
  // console.log("Sub", props.tutor.EXPERTISE);
  // console.log(format(values.start_time, "MM/dd/yyyy HH:mm:ss"));
  return (
    <div className="offer-form">
      <TutionOfferFields
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        subjects={props.tutor.EXPERTISE.split(", ")}
      />
      <RestrictedButton
        isDisabled={values.days.length === 0 || values.subjects.length === 0}
        onClick={handleOffer}
        label="Offer"
      ></RestrictedButton>
    </div>
  );
};

export default OfferForm;

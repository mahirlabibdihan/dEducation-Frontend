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
            subjects: "",
            start_date: new Date(),
            days: [],
            class_time: new Date("2014-08-18T00:00:00"),
            salary: 0,
          }
        : {
            tution_type:
              props.tution.TYPE === null ? "Offline" : props.tution.TYPE,
            subjects:
              props.tution.SUBJECTS === null ? "" : props.tution.SUBJECTS,
            start_date:
              props.tution.START_DATE === null
                ? new Date()
                : new Date(props.tution.START_DATE),
            days:
              props.tution.CLASS_DAYS === null
                ? []
                : props.tution.CLASS_DAYS.split(","),
            class_time:
              props.tution.CLASS_TIME === null
                ? new Date("2014-08-18T00:00:00")
                : new Date(
                    new Date(
                      `01/01/1970 ${convertTime12to24(props.tution.CLASS_TIME)}`
                    )
                  ),
            salary: props.tution.SALARY === null ? 0 : props.tution.SALARY,
          };
    return tution;
  };
  const [values, setValues] = useState(initValues());
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleOffer = async (event) => {
    let res;
    if (props.post === undefined) {
      res = await tutionController.offer(
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
    } else {
      res = await tutionController.postOffer(
        {
          days: values.days.toString(),
          type: values.tution_type,
          subjects: values.subjects,
          start_date: format(values.start_date, "MM/dd/yyyy"),
          class_days: values.days.toString(),
          class_time: format(values.class_time, "h:mm a"),
          salary: values.salary,
        },
        props.tutor_id,
        props.post
      );
    }

    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  useEffect(() => {
    setValues(initValues());
    console.log(initValues());
  }, [props]);
  return (
    <div className="offer-form">
      <TutionOfferFields
        values={values}
        setValues={setValues}
        handleChange={handleChange}
      />
      <RestrictedButton
        isDisabled={values.days.length === 0 || values.subjects === ""}
        onClick={handleOffer}
        label="Offer"
      ></RestrictedButton>
    </div>
  );
};

export default OfferForm;

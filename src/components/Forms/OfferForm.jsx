import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import "./OfferForm.scss";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { TutionOfferFields } from "../InputFields";
import { format } from "date-fns";
import { useEffect } from "react";
import { RestrictedButton } from "../Buttons";
import { Zoom } from "@mui/material";
import { getTime } from "../../service/DateUtils";
import Confirmation from "../Cards/Confirmation";
const tutionController = new TutionController();

const OfferForm = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
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
            start_date: null,
            days: [],
            start_time: getTime(8),
            end_time: getTime(9),
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
                ? null
                : new Date(props.tution.START_DATE),
            days:
              props.tution.CLASS_DAYS === null
                ? []
                : props.tution.CLASS_DAYS.split(", "),
            start_time:
              props.tution.START_TIME === null
                ? getTime(8)
                : new Date(props.tution.START_TIME),
            end_time:
              props.tution.END_TIME === null
                ? getTime(9)
                : new Date(props.tution.END_TIME),
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
      end_time: new Date(
        Math.max(
          values.start_time.getTime() + 60 * 60 * 1000,
          values.end_time.getTime()
        )
      ),
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
  useEffect(() => {
    console.log(":", values.start_date);
  });
  // console.log(format(new Date("2022-08-01 13:00:00"), "h:mm a"));
  // console.log(new Date());
  // console.log("Sub", props.tutor.EXPERTISE);
  // console.log(format(values.start_time, "MM/dd/yyyy HH:mm:ss"));
  return (
    <Zoom in={true}>
      <div className="offer-form">
        <TutionOfferFields
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          subjects={
            props.tutor.EXPERTISE === null
              ? []
              : props.tutor.EXPERTISE.split(", ")
          }
        />
        <RestrictedButton
          isDisabled={
            values.days.length === 0 ||
            values.subjects.length === 0 ||
            values.start_date === null
          }
          onClick={() => setOpen(true)}
          label="Offer"
        ></RestrictedButton>
        <Confirmation open={open} setOpen={setOpen} onConfirm={handleOffer} />
      </div>
    </Zoom>
  );
};

export default OfferForm;

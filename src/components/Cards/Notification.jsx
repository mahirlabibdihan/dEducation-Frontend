import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../../App";
import "./Notification.scss";
const tutionController = new TutionController();
const Notification = (props) => {
  // Similar to facebook post
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const navigate = new useNavigate();
  return (
    <div
      className="notification-card"
      aria-hidden="true"
      onClick={() => {
        navigate(props.notification.URL);
      }}
    >
      <div className="hbox">
        <img
          src={`http://localhost:5000/assets/images/${props.notification.IMAGE}`}
          alt=" "
          className="shadow small-image"
        />
        <div className="vbox w-100">
          <h6 className="poppins-font">{props.notification.TEXT}</h6>
          <h6 className="poppins-font time-stamp">
            {props.notification.TIMESTAMP}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Notification;

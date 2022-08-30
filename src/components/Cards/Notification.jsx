import React from "react";
import { useNavigate } from "react-router-dom";
import Zoom from "@mui/material/Zoom";
import "./Notification.scss";
import { API_BASE_URL } from "../..";
import { getTimeStamp } from "../../service/DateUtils";
const Notification = (props) => {
  const navigate = new useNavigate();
  return (
    <Zoom in={true}>
      <div
        className="notification-card"
        aria-hidden="true"
        onClick={() => {
          if (props.notification.URL !== null) navigate(props.notification.URL);
        }}
      >
        <div className="hbox">
          <img
            src={`${API_BASE_URL}/assets/images/${props.notification.IMAGE}`}
            alt=" "
            className="shadow-sm small-image"
          />
          <div className="vbox w-100">
            <h6 className="poppins-font">{props.notification.TEXT}</h6>
            <h6 className="poppins-font time-stamp">
              {getTimeStamp(props.notification.TIMESTAMP)}
            </h6>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Notification;

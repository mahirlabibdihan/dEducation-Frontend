import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import Zoom from "@mui/material/Zoom";
import { showToast } from "../../App";
import "./Notification.scss";
import { API_BASE_URL } from "../..";
const tutionController = new TutionController();
const Notification = (props) => {
  // Similar to facebook post
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
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
              {format(
                new Date(props.notification.TIMESTAMP),
                "dd MMM, yyyy hh:mm a"
              )}
            </h6>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Notification;

import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../../App";
import "./Notice.scss";
const tutionController = new TutionController();
const Notice = (props) => {
  // Similar to facebook post
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const navigate = new useNavigate();
  return (
    <Grid className="notice-card">
      <div className="vbox">
        <div className="hbox header">
          <img
            src={`http://localhost:5000/assets/images/${props.notice.IMAGE}`}
            alt=" "
            className="shadow small-image"
          />
          <div className="vbox w-100">
            <h6 className="poppins-font">{props.notice.NAME}</h6>
            <h6 className="poppins-font time-stamp">
              {props.notice.TIMESTAMP}
            </h6>
          </div>
        </div>
        <h6 className="poppins-font details">{props.notice.TEXT}</h6>
      </div>
    </Grid>
  );
};

export default Notice;

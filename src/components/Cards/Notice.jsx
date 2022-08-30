import React from "react";
import { Grid } from "@mui/material";
import Cookies from "universal-cookie";
import Zoom from "@mui/material/Zoom";
import "./Notice.scss";
import { API_BASE_URL } from "../..";
import { getTimeStamp } from "../../service/DateUtils";
const Notice = (props) => {
  const cookies = new Cookies();
  const type = cookies.get("type");
  return (
    <Zoom in={true}>
      <Grid className="notice-card">
        <div className="vbox">
          <div className="hbox header">
            <img
              src={`${API_BASE_URL}/assets/images/${props.notice.IMAGE}`}
              alt=" "
              className="shadow-sm small-image"
            />
            <div className="vbox w-100">
              <div className="hbox">
                <h6 className="poppins-font">
                  <b>{props.notice.NAME}</b>
                </h6>
                <h6 className="poppins-font notice-tag">
                  {` ( ${props.notice.SUBJECT}`}
                  {type === "TUTOR" ? `, ${props.notice.CLASS}` : ""}
                  {`)`}
                </h6>
              </div>

              <h6 className="poppins-font time-stamp">
                {getTimeStamp(props.notice.TIMESTAMP)}
              </h6>
            </div>
          </div>
          <h6 className="poppins-font details">{props.notice.TEXT}</h6>
        </div>
      </Grid>
    </Zoom>
  );
};

export default Notice;

import React from "react";
import { Grid } from "@mui/material";
import "./Feedback.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const Feedback = ({ rating, review }) => {
  return (
    <Grid className="feedback-card">
      <div className="vbox">
        <div className="hbox header">
          <div className="rating-head poppins-font">
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "orange", fontSize: "2rem" }}
            />
            <h6>{rating === -1 ? "N/A" : Math.round(rating * 100) / 100}</h6>
          </div>

          <h6 className="poppins-font details w-100">{review}</h6>
        </div>
        {/* <h6 className="poppins-font details">{props.notice.TEXT}</h6> */}
      </div>
    </Grid>
  );
};

export default Feedback;

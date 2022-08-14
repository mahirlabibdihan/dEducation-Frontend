import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../../App";
import "./Feedback.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const tutionController = new TutionController();
const Feedback = ({ rating, review }) => {
  // Similar to facebook post
  console.log(rating, review);
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const navigate = new useNavigate();
  return (
    <Grid className="feedback-card">
      <div className="vbox">
        <div className="hbox header">
          {/* <img
            // src={`http://localhost:5000/assets/images/student1.jpg`}
            alt=" "
            className="shadow-sm very-small-image"
          /> */}
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

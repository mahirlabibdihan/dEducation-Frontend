import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../../App";
import Zoom from "@mui/material/Zoom";
import "./Video.scss";
import ReactPlayer from "react-player";
const tutionController = new TutionController();
const Video = ({ video }) => {
  // Similar to facebook post
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const navigate = new useNavigate();
  return (
    <Zoom in={true} timeout={800}>
      <Grid className="video-card">
        <div className="vbox">
          <div className="hbox header">
            <img
              src={`http://localhost:5000/assets/images/${video.IMAGE}`}
              alt=" "
              className="shadow-sm small-image"
            />
            <div className="vbox w-100">
              <div className="hbox">
                <h6 className="poppins-font">
                  <b>{video.NAME}</b>
                  {/* Mahir Labib Dihan */}
                </h6>
              </div>
              <h6 className="poppins-font time-stamp">
                {format(new Date(video.TIMESTAMP), "dd MMM, yyyy hh:mm a")}
              </h6>
            </div>
          </div>
          <h6 className="poppins-font details">{video.DESCRIPTION}</h6>
          <Zoom in={true} timeout={800}>
            <div>
              <ReactPlayer
                url={video.LINK}
                controls={true}
                style={{
                  margin: "0 auto",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              />
            </div>
          </Zoom>
        </div>
      </Grid>
    </Zoom>
  );
};

export default Video;

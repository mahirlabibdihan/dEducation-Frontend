import React from "react";
import { Grid } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import "./Video.scss";
import ReactPlayer from "react-player";
import { API_BASE_URL } from "../..";
import { getTimeStamp } from "../../service/DateUtils";
const Video = ({ video }) => {
  return (
    <Zoom in={true} timeout={800}>
      <Grid className="video-card">
        <div className="vbox">
          <div className="hbox header">
            <img
              src={`${API_BASE_URL}/assets/images/${video.IMAGE}`}
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
                {getTimeStamp(video.TIMESTAMP)}
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

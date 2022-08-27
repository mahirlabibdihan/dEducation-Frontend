import React, { useState, useEffect } from "react";
import TutionPost from "../Cards/TutionPost";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Notice from "../Cards/Notice";
import Video from "../Cards/Video";
const tutionController = new TutionController();
const VideoContainer = (props) => {
  const cookies = new Cookies();

  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  // props.list.push({});
  return (
    <div className="videos-list">
      {props.list.map((video, index) =>
        video.NAME.toLowerCase().startsWith(props.query.toLowerCase()) ? (
          <Video video={video} />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default VideoContainer;

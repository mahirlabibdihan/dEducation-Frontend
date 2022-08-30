import React from "react";
import Video from "../Cards/Video";
const VideoContainer = (props) => {
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

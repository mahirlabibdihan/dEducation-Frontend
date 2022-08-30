import React from "react";
import Notice from "../Cards/Notice";
const NoticeContainer = (props) => {
  return (
    <div className="notices-list">
      {props.list.map((notice, index) =>
        notice.NAME.toLowerCase().startsWith(props.query.toLowerCase()) ? (
          <Notice notice={notice} />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default NoticeContainer;

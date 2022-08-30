import React from "react";
import "./styles.scss";
import Notification from "../Cards/Notification";

const NotificationContainer = (props) => {
  return (
    <div className="notifications-list">
      {props.list.map((notification, index) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;

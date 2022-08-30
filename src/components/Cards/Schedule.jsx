import React from "react";
import { format } from "date-fns";
import "./Schedule.scss";
import { API_BASE_URL } from "../..";

const Schedule = ({ schedule, x, y, w }) => {
  return (
    // <Zoom in={true}>
    <div
      className="schedule-card"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
      }}
    >
      <div className="hbox poppins-font content">
        <img
          src={`${API_BASE_URL}/assets/images/${schedule.IMAGE}`}
          alt=" "
          className="shadow-sm very-small-image"
        />
        <div className="schedule-details vbox">
          <h6 className="name">
            <b>{schedule.NAME}</b>
          </h6>
          <h6 className="subjects">{schedule.SUBJECTS}</h6>
          <h6 className="time-range">
            {format(new Date(schedule.START_TIME), "h:mm a")}
            {" - "}
            {format(new Date(schedule.END_TIME), "h:mm a")}
          </h6>
        </div>
      </div>
    </div>
    // </Zoom>
  );
};
export default Schedule;

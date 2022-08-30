import React from "react";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";
import Schedule from "../Cards/Schedule";
import Zoom from "@mui/material/Zoom";
import "./ScheduleContainer.scss";

const ScheduleContainer = ({ list }) => {
  const blocks = [];
  const date = new Date();
  date.setHours(0);
  for (let i = 0; i < 24; i++) {
    blocks.push(format(date, "h a"));
    date.setHours(date.getHours() + 1);
  }
  return (
    <Zoom in={true}>
      <div className="schedule-calender">
        {/* <h2 className="header">My Schedule</h2>
      <Divider /> */}
        <div className="schedule-grid">
          {blocks.map((time) => (
            <div className="schedule-block">
              <h6 className="poppins-font flex-center">{time}</h6>
              <Divider />
            </div>
          ))}
        </div>
        <div className="schedule-list">
          {list.map((schedule, index) => {
            const startDate = new Date(schedule.START_TIME);
            const endDate = new Date(schedule.END_TIME);
            const start = new Date(schedule.START_TIME).getHours();
            const end = new Date(schedule.END_TIME).getHours();
            const width =
              endDate.getHours() * 60 +
              endDate.getMinutes() -
              (startDate.getHours() * 60 + startDate.getMinutes());
            console.log(start, end);
            const x = Math.floor(start % 4) * 197 + 7;
            const y = 8 + Math.floor(start / 4) * 121 + 38;
            console.log(x, y);
            return <Schedule schedule={schedule} x={x} y={y} w={183} />;
          })}
        </div>
      </div>
    </Zoom>
  );
};

export default ScheduleContainer;

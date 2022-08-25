import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../Tables/Tables";
import { useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "../InputFields/SearchBar";
import NotificationTable from "../Tables/NotificationTable";
import { format } from "date-fns";
import Schedule from "../Cards/Schedule";
import Notification from "../Cards/Notification";
import "./ScheduleContainer.scss";
const cookies = new Cookies();

const ScheduleContainer = ({ list }) => {
  const blocks = [];
  const date = new Date();
  date.setHours(0);
  for (let i = 0; i < 24; i++) {
    blocks.push(format(date, "h a"));
    date.setHours(date.getHours() + 1);
  }
  return (
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
          const startDate = new Date(schedule.START_TIME.slice(0, -1));
          const endDate = new Date(schedule.END_TIME.slice(0, -1));
          const start = new Date(schedule.START_TIME.slice(0, -1)).getHours();
          const end = new Date(schedule.END_TIME.slice(0, -1)).getHours();
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
  );
};

export default ScheduleContainer;

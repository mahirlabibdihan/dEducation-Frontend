import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../Tables/Tables";
import { useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "../InputFields/SearchBar";
import NotificationTable from "../Tables/NotificationTable";
import "./styles.scss";
import Schedule from "../Cards/Schedule";
import Notification from "../Cards/Notification";
const cookies = new Cookies();

const ScheduleContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="schedule-list">
      {props.list.map((schedule, index) => (
        <Schedule schedule={schedule} />
      ))}
    </div>
  );
};

export default ScheduleContainer;

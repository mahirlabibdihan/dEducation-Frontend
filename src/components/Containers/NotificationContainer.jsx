import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../Tables/Tables";
import { useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "../InputFields/SearchBar";
import NotificationTable from "../Tables/NotificationTable";
import "./styles.scss";
import Notification from "../Cards/Notification";
const cookies = new Cookies();

const NotificationContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="notifications-list">
      {props.list.map((notification, index) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;

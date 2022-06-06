import React from "react";
import { Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./components.scss";
import { AccountCircleRounded } from "@mui/icons-material";
function Sidebar() {
  const sidebarButton = (link, name) => {
    return (
      <Button
        component={Link}
        to={link}
        className="sidebar-button"
        startIcon={<AccountCircleRounded />}
      >
        {name}
      </Button>
    );
  };
  return (
    <div className="sidebar-container">
      {sidebarButton("/", "Home")}
      {sidebarButton("/", "Request Tutor")}
      {sidebarButton("/", "My tutors")}
      {sidebarButton("/", "My coachings")}
      {sidebarButton("/", "Profile")}
      {sidebarButton("/", "Log Out")}
    </div>
  );
}

export default Sidebar;

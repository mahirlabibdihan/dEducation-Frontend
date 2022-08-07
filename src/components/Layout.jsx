import React, { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HailIcon from "@mui/icons-material/Hail";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ManIcon from "@mui/icons-material/Man";
import { Button } from "@mui/material";
import { logout } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Layout.scss";
import AuthController from "../controller/authController";
import ProfileController from "../controller/profileController";
import * as IMAGES from "../images";
import * as CONSTANTS from "../constants";
import Logo from "../assets/images/Logo-small.svg";
import GlobalContext from "../store/GlobalContext";
import CameraFrontOutlinedIcon from "@mui/icons-material/CameraFrontOutlined";
import BookIcon from "@mui/icons-material/Book";
import Cookies from "universal-cookie";
import MessageIcon from "@mui/icons-material/Message";
import { setLoading } from "../App";
// import GlobalContext from "../../store/GlobalContext";
const cookies = new Cookies();
const authController = new AuthController();
const profileController = new ProfileController();
const Layout = (props) => {
  const location = useLocation();
  console.log("Location:", location.pathname.split("/")[1]);
  const navigate = useNavigate();
  const globalCtx = useContext(GlobalContext);
  const type = cookies.get("type");
  const Buttons = () => {
    return (
      <>
        {[
          {
            label: "Home",
            path: "/home",
            icon: <HomeIcon sx={{ fontSize: "2rem" }} />,
          },
          type === "TUTOR"
            ? {
                label: "Tuition offers",
                path: "/tuition_offers",
                icon: <CameraFrontOutlinedIcon sx={{ fontSize: "2rem" }} />,
              }
            : {
                label: "Request Tutor",
                path: "/req_tutor",
                icon: <EditLocationAltIcon sx={{ fontSize: "2rem" }} />,
              },
          type === "TUTOR"
            ? {
                label: "My students",
                path: "/my_students",
                icon: <ManIcon sx={{ fontSize: "2rem" }} />,
              }
            : {
                label: "My tutors",
                path: "/my_tutors",
                icon: <HailIcon sx={{ fontSize: "2rem" }} />,
              },
          {
            label: "My coachings",
            path: "/my_coachings",
            icon: <LocationCityIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "My courses",
            path: "/my_courses",
            icon: <BookIcon sx={{ fontSize: "2rem" }} />,
          },
          /*{
            label: "Notice Board",
            path: "/notice_board",
            icon: <MessageIcon sx={{ fontSize: "2rem" }} />,
          },*/
          {
            label: "Profile",
            path: "/profile",
            icon: <AccountCircleIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Logout",
            path: "/",
            icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
          },
        ].map((button, index) => (
          <ListItemButton
            className={
              (button.path.split("/")[1] === location.pathname.split("/")[1]
                ? "active-"
                : "") + "side-button"
            }
            component={Button}
            onClick={() => {
              setTimeout(() => {
                if (button.path === "/") authController.logout();
                // if(setLoading(true);
                navigate(button.path);
              }, 300);
            }}
          >
            <ListItemIcon className="side-icon">{button.icon}</ListItemIcon>
            <Typography className="my-text">{button.label}</Typography>
          </ListItemButton>
        ))}
      </>
    );
  };
  const LeftPanel = () => {
    return (
      <div
        className="left-panel"
        onClick={() => globalCtx.setSelectedIndex(-1)}
        aria-hidden="true"
      >
        <div className="logo">
          <img src={Logo} className="logo-image" alt="logo"></img>
          <Typography className="logo-name">{CONSTANTS.BRAND_NAME}</Typography>
        </div>
        <Divider />
        <List className="side-buttons">
          <Buttons />
        </List>
      </div>
    );
  };
  return (
    <Grid className="layout-container">
      <div className="body">
        <LeftPanel />
        <div className="content">{props.children}</div>
      </div>
    </Grid>
  );
};

export default Layout;

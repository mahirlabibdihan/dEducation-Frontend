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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Layout.scss";
import AuthController from "../../controller/authController";
import ProfileController from "../../controller/profileController";
import * as IMAGES from "../../images";
import * as CONSTANTS from "../../constants";
import Logo from "../../assets/images/Logo-small.svg";
// import Logo from "../../assets/images/dEducation-small-logo.png";
import GlobalContext from "../../store/GlobalContext";
import CameraFrontOutlinedIcon from "@mui/icons-material/CameraFrontOutlined";
import BookIcon from "@mui/icons-material/Book";
import Cookies from "universal-cookie";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MessageIcon from "@mui/icons-material/Message";
import { setLoading } from "../../App";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BallotIcon from "@mui/icons-material/Ballot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import {
  faPersonChalkboard,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@mui/material";
import { showToast } from "../../App";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TodayIcon from "@mui/icons-material/Today";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
// import GlobalContext from "../../store/GlobalContext";
const cookies = new Cookies();
const authController = new AuthController();
const profileController = new ProfileController();
const Buttons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const setNotification = async () => {
    if (globalCtx.newNotificationFlag === false) {
      const res = await profileController.isNotificationAvailable();
      if (res.success === true && res.data === true) {
        globalCtx.setNewNotificationFlag(true);
      }
    }
  };
  useEffect(() => {
    setNotification();
    console.log(location.pathname.split("/")[1]);
  }, [location.pathname]);
  useEffect(() => {
    if (globalCtx.newNotificationFlag) {
      showToast("New notification available");
    }
  }, [globalCtx.newNotificationFlag]);
  return (
    <>
      {[
        {
          label: "Home",
          path: "/home",
          icon: <HomeIcon sx={{ fontSize: "2rem" }} />,
        },
        {
          label: "Demo Lectures",
          path: "/demo_lectures",
          icon: <OndemandVideoIcon sx={{ fontSize: "2rem" }} />,
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
              icon: (
                <FontAwesomeIcon
                  icon={faPersonChalkboard}
                  style={{ fontSize: "1.8rem" }}
                />
              ),
            },
        type === "TUTOR"
          ? {
              label: "Pending Requests",
              path: "/pending_requests",
              icon: <CameraFrontOutlinedIcon sx={{ fontSize: "2rem" }} />,
            }
          : {
              label: "Request Tutor",
              path: "/req_tutor",
              icon: (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ fontSize: "1.8rem" }}
                />
              ),
            },
        {
          label: "My coachings",
          path: "/my_coachings",
          icon: (
            <FontAwesomeIcon
              icon={faChalkboard}
              style={{ fontSize: "1.8rem" }}
            />
          ),
        },
        {
          label: "My courses",
          path: "/my_courses",
          icon: <CollectionsBookmarkIcon sx={{ fontSize: "2rem" }} />,
        },

        {
          label: "Notice Board",
          path: "/notice_board",
          icon: <BallotIcon sx={{ fontSize: "2rem" }} />,
        },
        {
          label: "My schedule",
          path: "/my_schedule",
          icon: <TodayIcon sx={{ fontSize: "2rem" }} />,
        },

        {
          label: "Notifications",
          path: "/notifications",
          icon:
            globalCtx.newNotificationFlag === true ? (
              <NotificationsIcon
                sx={{
                  fontSize: "2rem",
                  color: "orange",
                }}
              />
            ) : (
              <NotificationsIcon
                sx={{
                  fontSize: "2rem",
                }}
              />
            ),
        },
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
              if (button.path === "/") {
                globalCtx.setNewNotificationFlag(false);
                authController.logout();
              }
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
  const globalCtx = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleBack = () => {
    const list = location.pathname.split("/");
    list.pop();
    navigate(list.join("/"));
  };
  return (
    <div className="left-panel" aria-hidden="true">
      <div className="logo">
        <img src={Logo} className="logo-image" alt="logo"></img>
        <Typography className="logo-name">{CONSTANTS.BRAND_NAME}</Typography>
      </div>
      <Divider />
      <List className="side-buttons">
        <Buttons />
      </List>
      {location.pathname.split("/").length > 2 ? (
        <div
          style={{
            padding: "2rem",
            marginTop: "auto",
            // marginTop: "18.3vh",
            // display: "flex",
            // justifyContent: "flex-end",
          }}
        >
          <Button className="blue-button full-width" onClick={handleBack}>
            {/* <KeyboardBackspaceIcon sx={{ fontSize: "3rem" }} /> */}
            Back
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
const Layout = (props) => {
  const globalCtx = useContext(GlobalContext);

  return (
    <div className="layout-container">
      <div className="body">
        <LeftPanel />
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;

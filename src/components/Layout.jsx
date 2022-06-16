import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Logo from "../assets/images/Logo-small.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HailIcon from "@mui/icons-material/Hail";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ApprovalIcon from "@mui/icons-material/Approval";
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
// import AuthContext from "../../store/AuthContext";
const authController = new AuthController();
const profileController = new ProfileController();
const Layout = (props) => {
  // const authCtx = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  useEffect(() => {
    const getProfileData = async () => {
      const data = await profileController.getProfile();
      setType(data.type);
    };
    getProfileData();
  }, []);

  const StudentButtons = () => {
    return (
      <>
        {[
          {
            label: "Home",
            path: "/home",
            icon: <HomeIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Request Tutor",
            path: "/req_tutor",
            icon: <EditLocationAltIcon sx={{ fontSize: "2rem" }} />,
          },
          {
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
            label: "Profile",
            path: "/profile",
            icon: <AccountCircleIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Logout",
            path: "/login",
            icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
          },
        ].map((button, index) => (
          <ListItemButton
            className={
              (button.path === location.pathname ? "active " : "") +
              "side-button"
            }
            component={Button}
            onClick={() => {
              setTimeout(() => {
                authController.logout();
                navigate("/login");
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
  const TutorButtons = () => {
    return (
      <>
        {[
          {
            label: "Home",
            path: "/home",
            icon: <HomeIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Tuition offers",
            path: "/tuition_offers",
            icon: <EditLocationAltIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "My students",
            path: "/my_students",
            icon: <ManIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "My coachings",
            path: "/my_coachings",
            icon: <LocationCityIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Profile",
            path: "/profile",
            icon: <AccountCircleIcon sx={{ fontSize: "2rem" }} />,
          },
          {
            label: "Logout",
            path: "/login",
            icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
          },
        ].map((button, index) => (
          <ListItemButton
            className={
              (button.path === location.pathname ? "active " : "") +
              "side-button"
            }
            component={Button}
            onClick={() => {
              setTimeout(() => {
                authController.logout();
                navigate("/login");
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
  return (
    <Grid className="layout-container">
      <div className="body">
        <div className="side-bar">
          <div className="logo">
            <img src={Logo} className="logo-image" alt="logo"></img>
            <Typography className="logo-name">HIDDEN BRAIN</Typography>
          </div>
          <Divider />
          <List className="side-buttons">
            {type === "STUDENT" ? (
              <StudentButtons />
            ) : type === "TUTOR" ? (
              <TutorButtons />
            ) : (
              <></>
            )}
          </List>
        </div>
        <div>{props.children}</div>
      </div>
    </Grid>
  );
};

export default Layout;

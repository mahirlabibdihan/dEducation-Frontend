import React from "react";
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
import { Button } from "@mui/material";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Layout.scss";
const drawerWidth = 240;

const Layout = (props) => {
  const navigate = useNavigate();
  const drawer = <div>{/* <Toolbar /> */}</div>;
  return (
    <Grid className="layout-container">
      {/* <AppBar className="nav-bar">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            HIDDEN BRAIN
          </Typography>
        </Toolbar>
      </AppBar> */}
      <div className="body">
        <div className="side-bar">
          <div className="logo">
            <img src={Logo} className="logo-image" alt="logo"></img>
            <Typography className="logo-name">HIDDEN BRAIN</Typography>
          </div>
          <Divider />
          <List className="side-buttons">
            {[
              { label: "Home", icon: <HomeIcon sx={{ fontSize: "2rem" }} /> },
              {
                label: "Request Tutor",
                icon: <EditLocationAltIcon sx={{ fontSize: "2rem" }} />,
              },
              {
                label: "My tutors",
                icon: <HailIcon sx={{ fontSize: "2rem" }} />,
              },
              {
                label: "My coachings",
                icon: <LocationCityIcon sx={{ fontSize: "2rem" }} />,
              },
              {
                label: "Profile",
                icon: <AccountCircleIcon sx={{ fontSize: "2rem" }} />,
              },
              {
                label: "Logout",
                icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
              },
            ].map((button, index) => (
              <ListItemButton
                className="side-button"
                component={Button}
                onClick={() => {
                  setTimeout(() => {
                    // logout();
                    // navigate("/login");
                  }, 300);
                }}
              >
                <ListItemIcon className="side-icon">{button.icon}</ListItemIcon>
                <Typography className="my-text">{button.label}</Typography>
              </ListItemButton>
            ))}
            {/* onClick={() => {
          logout();
          navigate("/login");
        }} */}
          </List>
        </div>
        <div>{props.children}</div>
        {/* <h1>Dihan ddddddddd</h1> */}
      </div>
    </Grid>
  );
};

export default Layout;

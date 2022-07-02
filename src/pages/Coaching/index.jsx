import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import CoachingButtons from "./CoachingButtons";
import { useNavigate, useLocation } from "react-router";
import ListContainer from "../../components/ListContainer";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import MyCourses from "./My-Courses";
import AddCourse from "./Courses/AddCourse";
import "./coaching.scss";

// import InputField from "../../components/InputField";

const Coaching = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("ADMIN");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log(index);
  }, [index]);
  const CoachingHome = () => {
    return (
      <div className="coaching-home">
        <img
          src={require("../../assets/images/udvash.jpg")}
          alt="cover"
          className="cover-photo"
        ></img>
        <Divider />
        <div className="details">
          <h1>ULLASH ENGINEERING ADMISSION COACHING</h1>
          <h2>38/1, Indira Road, Farmgate, Dhaka</h2>
        </div>
        <Button
          variant="contained"
          className="apply-button"
          onClick={() => {
            setTimeout(() => {
              // navigate(button.path);
            }, 300);
          }}
        >
          JOIN
        </Button>
      </div>
    );
  };
  const RightPanel = () => {
    // Home
    // Edit details for admin
    // Join Request for NonMember

    // Courses
    // Add course for Admin
    // Selecting a course can change details or delete it

    // Member
    // Assign course for admin
    // See profile card

    // Join Request
    // See profile card once selected
    return (
      <div className="right-panel">
        {type === "ADMIN" && index === 2 ? <AddCourse /> : <></>}
        {/* <CoachingButtons /> */}
      </div>
    );
  };
  const navBarLink = (button, idx) => {
    return (
      <div
        className={`nav-bar-button ${
          index === idx ? "active-nav-bar-button" : ""
        }`}
        onClick={() => {
          // setTimeout(() => {
          //   navigate(button.path);
          // }, 300);

          setIndex(idx);
          // console.log(index, idx);
        }}
        aria-hidden="true"
      >
        <div className={`nav-bar-link`}>{button.label}</div>
      </div>
    );
  };
  const location = useLocation();
  const admin_buttons = [
    {
      label: "Home",
      path: "/coaching",
    },
    {
      label: "Members",
      path: "/coaching",
    },
    {
      label: "Courses",
      path: "/coaching/my_courses",
    },
    {
      label: "Join Requests",
      path: "/coaching",
    },
  ];
  const member_buttons = [
    {
      label: "Home",
      path: "/coaching",
    },
    {
      label: "My Courses",
      path: "/coaching/my_courses",
    },
    // {
    //   label: "Join",
    //   path: "/coaching/join",
    // },
  ];
  const Navbar = () => {
    return (
      <div className={`nav-container`}>
        <div className="nav-bar">
          {(type === "MEMBER" ? member_buttons : admin_buttons).map(
            (button, index) => navBarLink(button, index)
          )}
        </div>
      </div>
    );
  };
  return (
    <Grid className="coaching-container">
      <div className="mid-page">
        <Navbar />
        {index === 0 ? <CoachingHome /> : <MyCourses />}
      </div>
      <RightPanel />
    </Grid>
  );
};

export default Coaching;

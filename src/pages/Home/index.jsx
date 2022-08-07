import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import StudentHome from "./StudentHome";
import TutorHome from "./TutorHome";
import ProfileController from "../../controller/profileController";
import Cookies from "universal-cookie";
import "./home.scss";
const cookies = new Cookies();
const profileController = new ProfileController();

// import InputField from "../../components/InputField";

const Home = () => {
  const [type, setType] = useState("");
  const setHomeType = async () => {
    setType(cookies.get("type"));
  };
  useEffect(() => {
    setHomeType();
    // console.log(type);
  }, []);

  return (
    <div className="home-container">
      {type === "STUDENT" ? (
        <StudentHome />
      ) : type === "TUTOR" ? (
        <TutorHome />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

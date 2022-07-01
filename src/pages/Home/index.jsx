import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import StudentHome from "./StudentHome";
import TutorHome from "./TutorHome";
import "./home.scss";

// import InputField from "../../components/InputField";

const Home = () => {
  const [type, setType] = useState("STUDENT");
  useEffect(() => {
    console.log(type);
  }, []);

  return (
    <div className="home-container">
      {type === "STUDENT" ? <StudentHome /> : <TutorHome />}
    </div>
  );
};

export default Home;

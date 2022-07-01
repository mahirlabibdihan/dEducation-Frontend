import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./home.scss";

// import InputField from "../../components/InputField";

const TutorHome = () => {
  const [type, setType] = useState("STUDENT");
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);

  const DashBoard = () => {};
  const SearchFilter = () => {};
  return (
    <Grid className="tutor-home-container">
      <DashBoard />
      <SearchFilter />
    </Grid>
  );
};

export default TutorHome;

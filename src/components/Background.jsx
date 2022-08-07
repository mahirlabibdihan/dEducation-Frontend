// import styles from "../styles/_Home.module.scss";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./components.scss";
import * as IMAGES from "../images";
// import background from "../../public/images/home-background.jpg";
// import { StyledEngineProvider } from "@mui/material/styles";
// import Background from "../components/background/Background";
const Home = (props) => {
  const [showSpark, setShowSpark] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowSpark(true);
    }, 3000);
  }, []);
  return (
    <Grid className={`background ${props.className}`}>
      <img
        src={require("../assets/images/" + IMAGES.BACKGROUND_LIGHT)}
        className="bg-logo"
        alt="bg-logo"
      />
      {showSpark ? (
        <img
          src={require("../assets/images/" + IMAGES.BACKGROUND_SPARK)}
          className="bg-spark"
          alt="bg-spark"
        />
      ) : (
        <></>
      )}
      <div>{props.children}</div>
    </Grid>
  );
};

export default Home;

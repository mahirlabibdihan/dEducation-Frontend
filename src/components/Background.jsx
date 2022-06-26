// import styles from "../styles/_Home.module.scss";
import * as React from "react";
import Grid from "@mui/material/Grid";
import "./components.scss";
import * as IMAGES from "../images";
// import background from "../../public/images/home-background.jpg";
// import { StyledEngineProvider } from "@mui/material/styles";
// import Background from "../components/background/Background";
const Home = (props) => {
  return (
    <Grid className={`background ${props.className}`}>
      <img
        src={require("../assets/images/" + IMAGES.BACKGROUND_IMAGE_OVERRIDE)}
        className="bg-overlay"
        alt="bg-overlay"
      ></img>
      <div>{props.children}</div>
    </Grid>
  );
};

export default Home;

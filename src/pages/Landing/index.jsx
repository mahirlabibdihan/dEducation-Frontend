// import styles from "../styles/_Home.module.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import { Background } from "../../components";
import "./landing.scss";
import Button from "@mui/material/Button";
// import background from "../../public/images/home-background.jpg";
// import { StyledEngineProvider } from "@mui/material/styles";
// import Background from "../components/background/Background";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Background>
      <Grid className="landing-container">
        <Button
          onClick={() => {
            setTimeout(() => {
              navigate("/login");
            }, 300);
          }}
          variant="contained"
          className="rounded mt-3 student-button"
        >
          Student?
        </Button>
        <Button
          onClick={() => {
            setTimeout(() => {
              navigate("/login");
            }, 300);
          }}
          variant="contained"
          className="rounded mt-3 tutor-button"
        >
          Tutor?
        </Button>
      </Grid>
    </Background>
  );
};

export default Home;

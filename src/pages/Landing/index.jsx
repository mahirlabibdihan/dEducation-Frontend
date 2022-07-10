// import styles from "../styles/_Home.module.scss";
import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Background } from "../../components";
import "./landing.scss";
import Button from "@mui/material/Button";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams } from "react-router-dom";
// import background from "../../public/images/home-background.jpg";
// import { StyledEngineProvider } from "@mui/material/styles";
// import Background from "../components/background/Background";
const Home = () => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <Background>
      <Grid className="landing-container">
        <Button
          onClick={() => {
            setTimeout(() => {
              // globalCtx.setLoggedInAs("STUDENT");
              // navigate("/login");
              navigate({
                pathname: "/login",
                search: createSearchParams({
                  type: "STUDENT",
                }).toString(),
              });
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
              // globalCtx.setLoggedInAs("TUTOR");
              // navigate("/login");
              navigate({
                pathname: "/login",
                search: createSearchParams({
                  type: "TUTOR",
                }).toString(),
              });
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

// import styles from "../styles/_Home.module.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components";
import "./landing.scss";
import Button from "@mui/material/Button";
import { createSearchParams } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Background>
      <Grid className="landing-container">
        <Button
          variant="contained"
          onClick={() => {
            setTimeout(() => {
              navigate({
                pathname: "/login",
                search: createSearchParams({
                  type: "STUDENT",
                }).toString(),
              });
            }, 300);
          }}
          className="rounded mt-3 student-button"
        >
          Student?
        </Button>
        <Button
          onClick={() => {
            setTimeout(() => {
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

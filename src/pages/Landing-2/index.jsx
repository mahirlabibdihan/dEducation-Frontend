// import styles from "../styles/_Home.module.scss";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components";
import "./landing.scss";
import Button from "@mui/material/Button";
import { createSearchParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useEffect } from "react";
import { Fade } from "@mui/material";
import { Slide } from "@mui/material";
const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  // const [show2, setShow2] = useState(true);
  const [time1, setTime1] = useState("start");
  const [time2, setTime2] = useState("start");
  const [time3, setTime3] = useState("start");
  const [write, setWrite] = useState("write");
  useEffect(() => {
    // setTimeout(() => {
    //   setWrite("static");
    // }, 3000);
  }, []);
  return (
    <Grid className={`background`}>
      <img
        src={require("../../assets/images/dEducation-Part1.png")}
        className={`bg-1 ${time1 === "start" ? "lr-1" : "lr-4"}`}
        alt="bg-1"
      />
      <img
        src={require("../../assets/images/dEducation-Part2.png")}
        className={`bg-2 ${time2 === "start" ? "lr-2" : "lr-5"}`}
        alt="bg-spark"
      />
      <img
        src={require("../../assets/images/dEducation-Part3.png")}
        className={`bg-3 ${time3 === "start" ? "lr-3" : "lr-6"}`}
        alt="bg-spark"
      />
      <Grid className="landing-container">
        <div className={`type-writer-text ${show ? "" : "slide-down"}`}>
          <div className="type-writer-brand">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("DEDUCATION").start();
              }}
            />
          </div>
          <div className="type-writer-slogan">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("Dedication to Education").start();
                // typewriter.stop();
              }}
            />
          </div>
        </div>

        <Slide
          direction="up"
          in={show}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Button
            variant="contained"
            onClick={() => {
              setShow(false);
              setWrite("delete");
              setTimeout(() => {
                setTime1("end");
              }, 0);
              setTimeout(() => {
                setTime2("end");
              }, 110);
              setTimeout(() => {
                setTime3("end");
              }, 250);
              setTimeout(() => {
                navigate({
                  pathname: "/login",
                  search: createSearchParams({
                    type: "STUDENT",
                  }).toString(),
                });
              }, 2000);
            }}
            className="rounded mt-3 get-started-button"
          >
            Get Started
          </Button>
        </Slide>
        {/* <Button
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
        </Button> */}
      </Grid>
    </Grid>
  );
};

export default Home;

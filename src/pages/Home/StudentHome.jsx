import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import TutorsController from "../../controller/tutorsController";
import "./home.scss";
import CoachingController from "../../controller/coachingController";
import UserCard from "../../components/UserCard";
const tutorsController = new TutorsController();
const coachingController = new CoachingController();
// import InputField from "../../components/InputField";

const StudentHome = () => {
  const [tutorsList, setTutorsList] = useState([]);
  const [coachingsList, setCoachingsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const setList = async () => {
      const list = await tutorsController.getTutorsList();
      var shortList = [];
      for (let i = 0; i < Math.min(3, list.data.length); i++) {
        console.log(i, list.data[i]);
        shortList.push(list.data[i]);
      }
      console.log(list);
      setTutorsList(shortList);

      const result = await coachingController.getList();
      var shortList2 = [];
      for (let i = 0; i < Math.min(3, result.data.length); i++) {
        // console.log(i, result.data[i]);
        shortList2.push(result.data[i]);
      }
      console.log(list);
      setCoachingsList(shortList2);
    };
    setList();
    console.log(tutorsList);
  }, []);

  const ListContainer = (props) => {
    return (
      <div className="short-list-container">
        <h2 className="header">{props.header}</h2>
        <Divider />
        <div className="short-list-box">
          <div className="short-list">
            {props.list.map((tutor, index) => (
              <UserCard user={tutor} />
            ))}
          </div>
          <Button
            variant="contained"
            className="next-button"
            onClick={() => {
              setTimeout(() => {
                navigate(props.path);
              }, 300);
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </div>
    );
  };
  const DashBoard = () => {
    return (
      <div className="dash-board">
        <ListContainer header="Tutors" path="/tutors" list={tutorsList} />
        <ListContainer
          header="Coachings"
          path="/coachings"
          list={coachingsList}
        />
      </div>
    );
  };
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  return (
    <Grid className="student-home-container">
      <DashBoard />
      {/* <SearchFilter /> */}
    </Grid>
  );
};

export default StudentHome;

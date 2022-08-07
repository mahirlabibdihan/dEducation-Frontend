import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import TutorsController from "../../controller/tutorsController";
import "./home.scss";
import CoachingController from "../../controller/coachingController";
import UserCard from "../../components/UserCard";
import ProfileController from "../../controller/profileController";
import StudentPanel from "./StudentPanel";
import { setLoading } from "../../App";
const tutorsController = new TutorsController();
const coachingController = new CoachingController();
const profileController = new ProfileController();

const StudentHome = () => {
  const [tutorsList, setTutorsList] = useState([]);
  const [coachingsList, setCoachingsList] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const setProfileData = async () => {
    const res = await profileController.getProfile();
    if (res.success) {
      setUser(res.data);
    }
  };
  useEffect(() => {
    console.log("ON MOUNT");
    setList();
    setProfileData();
  }, []);

  useEffect(() => {
    console.log("ON RENDER");
    if (
      tutorsList !== undefined &&
      coachingsList !== undefined &&
      user !== undefined
    ) {
      setLoading(false);
    }
  }, [tutorsList, coachingsList, user]);
  const setList = async () => {
    const list = await tutorsController.getTutorsList();
    var shortList = [];
    // for (let i = 0; i < Math.min(3, list.data.length); i++) {
    //   shortList.push(list.data[i]);
    // }
    for (let i = 0; i < list.data.length; i++) {
      shortList.push(list.data[i]);
    }
    setTutorsList(shortList);

    const res = await coachingController.getList();
    var shortList2 = [];
    // for (let i = 0; i < Math.min(3, res.data.length); i++) {
    //   shortList2.push(res.data[i]);
    // }
    for (let i = 0; i < res.data.length; i++) {
      shortList2.push(res.data[i]);
    }
    setCoachingsList(shortList2);
  };

  const ListContainer = (props) => {
    return (
      <div className="short-list-container">
        <h2 className="header">{props.header}</h2>
        <Divider />
        <div className="short-list-box">
          <div className="short-list">
            {props.list.map((tutor, index) => (
              <UserCard className="scroll" user={tutor} />
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
        <ListContainer header="Tutors" path="/home/tutors" list={tutorsList} />
        <ListContainer
          header="Coachings"
          path="/home/coachings"
          list={coachingsList}
        />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        <StudentPanel student={user} />
      </div>
    );
  };
  return (
    <Grid className="student-home-container">
      <DashBoard />
      <RightPanel />
    </Grid>
  );
};

export default StudentHome;

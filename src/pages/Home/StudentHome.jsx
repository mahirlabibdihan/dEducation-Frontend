import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import TutorsController from "../../controller/tutorsController";
import "./home.scss";
import CoachingController from "../../controller/coachingController";
import UserCard from "../../components/Cards/UserCard";
import ProfileController from "../../controller/profileController";
import StudentPanel from "../../components/Panels/StudentPanel";
import { setLoading } from "../../App";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
import CardSmallContainer from "../../components/Containers/CardSmallContainer";
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
    setList();
    setProfileData();
  }, []);

  useEffect(() => {
    if (
      tutorsList !== undefined &&
      coachingsList !== undefined &&
      user !== undefined
    ) {
      setLoading(false);
    }
  }, [tutorsList, coachingsList, user]);
  const setList = async () => {
    const list1 = await tutorsController.getTutorsList();
    setTutorsList(list1.data);
    const list2 = await coachingController.getList();
    setCoachingsList(list2.data);
  };

  const DashBoard = () => {
    return (
      <div className="dash-board">
        <CardSmallContainer
          header="Tutors"
          path="/home/tutors"
          list={tutorsList}
        />
        <CardSmallContainer
          header="Coachings"
          path="/home/coachings"
          list={coachingsList}
        />
      </div>
    );
  };
  return (
    <MainContainer className="student-home-container">
      <DashBoard />
      <RightPanel>
        <StudentPanel student={user} />
      </RightPanel>
    </MainContainer>
  );
};

export default StudentHome;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./tutors.scss";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "./TutorPanel";
import ProfileController from "../../controller/profileController";
const tutorsController = new TutorsController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const Tutors = () => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [tutor, setTutor] = useState({});
  const [tutorsList, setTutorsList] = useState([{ name: "Mahir Labib Dihan" }]);
  const setList = async () => {
    const list = await tutorsController.getTutorsList();
    setTutorsList(list.data);
  };
  useEffect(() => {
    setList();
    console.log(tutorsList);
  }, []);

  const setTutorProfile = async () => {
    const data = await profileController.getProfileByID(globalCtx.selectedUser);
    console.log("TUTOR", data);
    setTutor(data);
  };

  useEffect(() => {
    setTutorProfile();
  }, [globalCtx.selectedUser]);
  const TutorsList = () => {
    return <ListContainer header="Tutors" list={tutorsList} />;
  };
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {tutor === undefined || globalCtx.selectedUser === -1 ? (
          <SearchFilter />
        ) : (
          <TutorPanel tutor={tutor} />
        )}
      </div>
    );
  };
  return (
    <Grid className="tutors-container">
      <TutorsList />
      <RightPanel />
    </Grid>
  );
};

export default Tutors;

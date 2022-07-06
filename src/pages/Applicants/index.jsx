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
import TutionController from "../../controller/tutionController";
const tutionController = new TutionController();
const tutorsController = new TutorsController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const Applicants = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list = await tutionController.getApplicants(globalCtx.postId);
    console.log("APPLICANTS", list.data[0]);
    setTutorsList(list.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setTutor(tutorsList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);
  const TutorsList = () => {
    return <ListContainer header="Applicants" list={tutorsList} />;
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
        {tutor === undefined || globalCtx.selectedIndex === -1 ? (
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

export default Applicants;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./my-tutors.scss";
import TutorsController from "../../controller/tutorsController";
import SearchBox from "../Applicants/SearchBox";
import TutorPanel from "./TutorPanel";
import ProfileController from "../../controller/profileController";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
const tutionController = new TutionController();
const tutorsController = new TutorsController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const MyTutors = () => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [tutor, setTutor] = useState({});
  const [tution, setTution] = useState({});
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const result = await tutorsController.getMyTutorsList();
    console.log("MY TUTORS", result);
    setTutorsList(result.data);
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
  const setTutionOffer = async () => {
    const result = await tutionController.getOfferFromTutor(
      globalCtx.selectedUser
    );
    console.log("GOT OFFER", result);
    setTution(result.data);
  };

  useEffect(() => {
    setTutorProfile();
    setTutionOffer();
  }, [globalCtx.selectedUser]);
  const TutorsList = () => {
    return <ListContainer header="My Tutors" list={tutorsList} />;
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
        {tutor === undefined ||
        tution === undefined ||
        globalCtx.selectedUser === -1 ? (
          <SearchFilter />
        ) : (
          <TutorPanel tutor={tutor} tution={tution} />
        )}
      </div>
    );
  };
  return (
    <Grid className="my-tutors-container">
      <TutorsList />
      <RightPanel />
    </Grid>
  );
};

export default MyTutors;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
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
  const [tution, setTution] = useState({});
  const [tutionsList, setTutionsList] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const setList = async () => {
    // Get all the applicants id first
    // Then get their profile details using user_id
    // If there is 'PENDING' or 'ACCEPTED' offer, then get tution informations also
    // Else get tution post informations
    const list1 = await tutorsController.getApplicantsList(
      searchParams.get("post_id")
    );
    console.log("APPLICANTS", list1.data[0]);
    setTutorsList(list1.data);
    const list2 = await tutionController.getApplicantsTutionDetails(
      searchParams.get("post_id")
    );
    console.log("APPLICANTS TUTIONS", list2.data[0]);
    setTutionsList(list2.data);
  };
  useEffect(() => {
    console.log("ID:", searchParams.get("post_id"));
    setList();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
      // globalCtx.setSelectedIndex(-1);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setTutor(tutorsList[globalCtx.selectedIndex]);
      setTution(tutionsList[globalCtx.selectedIndex]);
      console.log(tutor.USER_ID);
    } else {
      setTution({});
      setTutor({});
    }
    console.log("SELECTED");
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
          <TutorPanel tutor={tutor} tution={tution} />
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

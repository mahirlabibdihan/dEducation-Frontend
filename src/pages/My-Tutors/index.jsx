import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import "./my-tutors.scss";
import TutorsController from "../../controller/tutorsController";
import SearchBox from "../Applicants/SearchBox";
import TutorPanel from "./TutorPanel";
import GlobalContext from "../../store/GlobalContext";
const tutorsController = new TutorsController();

const MyTutors = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const result = await tutorsController.getMyTutorsList();
    setTutorsList(result.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setTutor(tutorsList[globalCtx.selectedIndex]);
    else setTutor({});
  }, [globalCtx.selectedIndex]);
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
        {tutor === undefined || globalCtx.selectedIndex === -1 ? (
          <></>
        ) : (
          <TutorPanel tutor={tutor} />
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

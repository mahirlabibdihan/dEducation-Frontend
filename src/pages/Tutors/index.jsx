import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import ListContainer from "../../components/ListContainer";
import "./tutors.scss";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "./TutorPanel";
const tutorsController = new TutorsController();

const Tutors = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list = await tutorsController.getTutorsList();
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

export default Tutors;

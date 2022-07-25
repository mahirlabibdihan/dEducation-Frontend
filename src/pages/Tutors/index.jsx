import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import ListContainer from "../../components/ListContainer";
import "./tutors.scss";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "./TutorPanel";
import TutionController from "../../controller/tutionController";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const Tutors = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tution, setTution] = useState({});
  const [tutionsList, setTutionsList] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list1 = await tutorsController.getTutorsList();
    setTutorsList(list1.data);
    console.log("Tutors=", list1);
    const list2 = await tutionController.getTutionsList();
    console.log("Tutions=", list2);
    setTutionsList(list2.data);
  };
  useEffect(() => {
    console.log("GET TUTION DETAILS");
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setTutor(tutorsList[globalCtx.selectedIndex]);
      setTution(tutionsList[globalCtx.selectedIndex]);
    } else {
      setTutor({});
      setTution({});
    }
    console.log("SElceted");
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
        {tutor === undefined ||
        tution === undefined ||
        globalCtx.selectedIndex === -1 ? (
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

export default Tutors;

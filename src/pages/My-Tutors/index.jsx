import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import "./my-tutors.scss";
import TutorsController from "../../controller/tutorsController";
import SearchBox from "../Applicants/SearchBox";
import TutorPanel from "./TutorPanel";
import GlobalContext from "../../store/GlobalContext";
import TutionController from "../../controller/tutionController";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const MyTutors = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tution, setTution] = useState({});
  const [tutionsList, setTutionsList] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list1 = await tutorsController.getMyTutorsList();
    setTutorsList(list1.data);
    console.log("Tutors=", list1);
    const list2 = await tutionController.getMyTutionsList();
    console.log("Tutions=", list2);
    setTutionsList(list2.data);
  };
  useEffect(() => {
    setList();
  }, []);

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
        globalCtx.selectedIndex === -1 ? (
          <></>
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

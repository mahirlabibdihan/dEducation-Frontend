import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import "./my-tutors.scss";
import TutorsController from "../../controller/tutorsController";
import TutorPanel from "../../components/TutorPanel";
import GlobalContext from "../../store/GlobalContext";
import TutionController from "../../controller/tutionController";
import { useSearchParams } from "react-router-dom";
const tutorsController = new TutorsController();
const tutionController = new TutionController();
const TutorsList = ({ list }) => {
  return <ListContainer header="My Tutors" list={list} />;
};
const RightPanel = ({ tutor, tution }) => (
  <div className="right-panel">
    {tutor === undefined || tution === undefined ? (
      <></>
    ) : (
      <TutorPanel tutor={tutor} tution={tution} />
    )}
  </div>
);
const MyTutors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tution, setTution] = useState({});
  const [tutionsList, setTutionsList] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list1 = await tutorsController.getMyTutorsList();
    setTutorsList(list1.data);
    const list2 = await tutionController.getMyTutionsList();
    setTutionsList(list2.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (searchParams.get("id") !== null) {
      setTutor(tutorsList[Number(searchParams.get("id"))]);
      setTution(tutionsList[Number(searchParams.get("id"))]);
    } else {
      setTutor(undefined);
      setTution(undefined);
    }
  }, [searchParams, tutorsList, tutionsList]);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);

  return (
    <Grid className="my-tutors-container">
      <TutorsList list={tutorsList} />
      <RightPanel tutor={tutor} tution={tution} />
    </Grid>
  );
};

export default MyTutors;

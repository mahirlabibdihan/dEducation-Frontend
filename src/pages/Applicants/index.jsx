import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { useSearchParams } from "react-router-dom";
import ListContainer from "../../components/ListContainer";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "../../components/TutorPanel";
import TutionController from "../../controller/tutionController";
import "./applicants.scss";
const tutionController = new TutionController();
const tutorsController = new TutorsController();

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
    setTutorsList(list1.data);
    const list2 = await tutionController.getApplicantsTutionDetails(
      searchParams.get("post_id")
    );
    setTutionsList(list2.data);
  };
  useEffect(() => {
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
      setTution({});
      setTutor({});
    }
  }, [globalCtx.selectedIndex, tutorsList, tutionsList]);
  const TutorsList = () => {
    return <ListContainer header="Applicants" list={tutorsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {tutor === undefined || globalCtx.selectedIndex === -1 ? (
          <></>
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

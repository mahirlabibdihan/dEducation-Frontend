import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { useSearchParams } from "react-router-dom";
import CardContainer from "../../components/Containers/CardContainer";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "../../components/Panels/TutorPanel";
import TutionController from "../../controller/tutionController";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
const tutionController = new TutionController();
const tutorsController = new TutorsController();

const TutorsList = ({ list }) => {
  return <CardContainer header="Applicants" list={list} />;
};

const Applicants = () => {
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState(undefined);
  const [tutorsList, setTutorsList] = useState([]);
  const [tution, setTution] = useState(undefined);
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
    if (searchParams.get("id") !== null) {
      setTutor(tutorsList[Number(searchParams.get("id"))]);
      setTution(tutionsList[Number(searchParams.get("id"))]);
    } else {
      setTutor(undefined);
      setTution(undefined);
    }
  }, [searchParams, tutorsList, tutionsList]);
  return (
    <MainContainer className="tutors-container">
      <TutorsList list={tutorsList} />
      <RightPanel>
        {tutor === undefined || tution === undefined ? (
          <></>
        ) : (
          <TutorPanel tutor={tutor} tution={tution} />
        )}
      </RightPanel>
    </MainContainer>
  );
};

export default Applicants;

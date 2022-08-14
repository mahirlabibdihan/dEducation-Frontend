import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import CardContainer from "../../components/Containers/CardContainer";
import TutorsController from "../../controller/tutorsController";
import TutorPanel from "../../components/Panels/TutorPanel";
import GlobalContext from "../../store/GlobalContext";
import TutionController from "../../controller/tutionController";
import { useSearchParams } from "react-router-dom";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
const tutorsController = new TutorsController();
const tutionController = new TutionController();
const TutorsList = ({ list }) => {
  return <CardContainer header="My Tutors" list={list} />;
};
const MyTutors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState(undefined);
  const [tution, setTution] = useState(undefined);
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
      const index = tutorsList
        .map((t) => t.USER_ID)
        .indexOf(Number(searchParams.get("id")));

      setTutor(tutorsList[index]);
      setTution(tutionsList[index]);
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
    <MainContainer>
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

export default MyTutors;

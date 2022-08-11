import React, { useState, useEffect, useContext } from "react";
import TutorSearchForm from "../../components/Forms/TutorSearchForm";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "../../components/Panels/TutorPanel";
import TutionController from "../../controller/tutionController";
import { useSearchParams } from "react-router-dom";
import CardContainer from "../../components/Containers/CardContainer";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const SearchFilter = () => {
  return (
    <div className="search-filter">
      <TutorSearchForm />
    </div>
  );
};
const TutorsList = ({ list }) => <CardContainer header="Tutors" list={list} />;
const Tutors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState(undefined);
  const [tution, setTution] = useState(undefined);
  const [tutionsList, setTutionsList] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  const setList = async () => {
    const list1 = await tutorsController.getTutorsList();
    setTutorsList(list1.data);
    const list2 = await tutionController.getTutionsList();
    setTutionsList(list2.data);
  };
  const setFilteredList = async (data) => {
    const list = await tutorsController.getFilteredTutorsList(data);
    setTutorsList(list.data);
    const list2 = await tutionController.getFilteredTutionsList(data);
    setTutionsList(list2.data);
  };
  const setShowableList = () => {
    if (searchParams.get("gender") === null) {
      setList();
    } else {
      setFilteredList({
        gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        status: searchParams.get("status"),
        experience: searchParams.get("experience"),
      });
    }
  };
  useEffect(() => setShowableList(), []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setShowableList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate, searchParams]);

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
    <MainContainer>
      <TutorsList list={tutorsList} />
      <RightPanel>
        {tutor === undefined || tution === undefined ? (
          <SearchFilter />
        ) : (
          <TutorPanel tutor={tutor} tution={tution} />
        )}
      </RightPanel>
    </MainContainer>
  );
};

export default Tutors;

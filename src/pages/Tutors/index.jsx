import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import ListContainer from "../../components/ListContainer";
import "./tutors.scss";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "../../components/TutorPanel";
import TutionController from "../../controller/tutionController";
import { useSearchParams } from "react-router-dom";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const Tutors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [tutor, setTutor] = useState({});
  const [tution, setTution] = useState({});
  // const [education, setEducation] = useState([]);
  const [tutionsList, setTutionsList] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  // const [educationsList, setEducationsList] = useState([]);
  const setList = async () => {
    const list1 = await tutorsController.getTutorsList();
    setTutorsList(list1.data);
    const list2 = await tutionController.getTutionsList();
    setTutionsList(list2.data);
    // const list3 = await tutorsController.getEducationsList();
    // setEducationsList(list3.data);
  };
  const setFilteredList = async (data) => {
    const list = await tutorsController.getFilteredTutorsList(data);
    setTutorsList(list.data);
    const list2 = await tutionController.getFilteredTutionsList(data);
    setTutionsList(list2.data);
    if (globalCtx.selectedIndex !== -1) {
      setTutor(tutorsList[globalCtx.selectedIndex]);
      setTution(tutionsList[globalCtx.selectedIndex]);
    } else {
      setTutor({});
      setTution({});
    }
    // const list3 = await tutorsController.getFilteredEducationList();
    // setEducationsList(list3.data);
  };
  // useEffect(() => {
  //   if (searchParams.get("gender") === null) {
  //     setList();
  //   } else {
  //     console.log("FILTER");
  //     setFilteredList({
  //       gender: searchParams.get("gender"),
  //       start_salary: searchParams.get("start"),
  //       end_salary: searchParams.get("end"),
  //       status: searchParams.get("status"),
  //       experience: searchParams.get("experience"),
  //     });
  //   }
  // }, [searchParams]);
  useEffect(() => {
    if (searchParams.get("gender") === null) {
      setList();
    } else {
      console.log("FILTER");
      setFilteredList({
        gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        status: searchParams.get("status"),
        experience: searchParams.get("experience"),
      });
    }
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setTutor(tutorsList[globalCtx.selectedIndex]);
    } else {
      setTutor({});
    }
  }, [tutorsList]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setTution(tutionsList[globalCtx.selectedIndex]);
    } else {
      setTution({});
    }
  }, tutionsList);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      if (searchParams.get("gender") === null) {
        setList();
      } else {
        console.log("FILTER");
        setFilteredList({
          gender: searchParams.get("gender"),
          start_salary: searchParams.get("start"),
          end_salary: searchParams.get("end"),
          status: searchParams.get("status"),
          experience: searchParams.get("experience"),
        });
      }
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate, searchParams]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setTutor(tutorsList[globalCtx.selectedIndex]);
      setTution(tutionsList[globalCtx.selectedIndex]);
      // setEducation(educationsList[globalCtx.selectedIndex]);
    } else {
      setTutor({});
      setTution({});
      // setEducation([]);
    }
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

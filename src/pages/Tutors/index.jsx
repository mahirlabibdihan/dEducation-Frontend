import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
// import ListContainer from "../../components/ListContainer";
import TutorsController from "../../controller/tutorsController";
import GlobalContext from "../../store/GlobalContext";
import TutorPanel from "../../components/TutorPanel";
import TutionController from "../../controller/tutionController";
import { useSearchParams } from "react-router-dom";
// import React, { useState, useEffect, useRef, useContext } from "react";
// import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import { Divider, Typography } from "@mui/material";
// import "./ListContainer.scss";
import UserCard from "../../components/UserCard";
import SearchIcon from "@mui/icons-material/Search";
// import GlobalContext from "../store/GlobalContext";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import InputField from "./InputField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./tutors.scss";
import InputField from "../../components/InputField";
const tutorsController = new TutorsController();
const tutionController = new TutionController();

const SearchFilter = () => {
  return (
    <div className="search-filter">
      <SearchBox />
    </div>
  );
};
const RightPanel = ({ tutor, tution }) => (
  <div className="right-panel">
    {tutor === undefined || tution === undefined ? (
      <SearchFilter />
    ) : (
      <TutorPanel tutor={tutor} tution={tution} />
    )}
  </div>
);
const TutorsList = ({ list }) => <ListContainer header="Tutors" list={list} />;
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
  useEffect(() => {
    console.log("Tutors Rerendered");
    setList();
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
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
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
    <div className="tutors-container">
      <TutorsList list={tutorsList} />
      <RightPanel tutor={tutor} tution={tution} />
    </div>
  );
};

export default Tutors;

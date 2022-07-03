import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./tutors.scss";
import TutorsController from "../../controller/tutorsController";
const tutorsController = new TutorsController();

// import InputField from "../../components/InputField";

const Tutors = () => {
  const navigate = useNavigate();
  const [tutorsList, setTutorsList] = useState([{ name: "Mahir Labib Dihan" }]);
  useEffect(() => {
    const setList = async () => {
      const list = await tutorsController.getTutorsList();
      setTutorsList(list.data);
    };
    setList();
    console.log(tutorsList);
  }, []);

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
  return (
    <Grid className="tutors-container">
      <TutorsList />
      <SearchFilter />
    </Grid>
  );
};

export default Tutors;

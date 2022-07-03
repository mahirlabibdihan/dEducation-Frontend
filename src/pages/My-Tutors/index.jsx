import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./my-tutors.scss";

// import InputField from "../../components/InputField";

const MyTutors = () => {
  const [tutorsList, setTutorsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);

  //   for (let i = 0; i < 100; i++) {
  //     list.push(<h4>Dihan</h4>);
  //   }
  const TutorsList = () => {
    return <ListContainer header="My Tutors" list={tutorsList} />;
  };
  //   const SearchFilter = () => {
  //     return (
  //       <div className="search-filter">
  //         <SearchBox />
  //       </div>
  //     );
  //   };
  return (
    <Grid className="my-tutors-container">
      <TutorsList />
      {/* <SearchFilter /> */}
    </Grid>
  );
};

export default MyTutors;

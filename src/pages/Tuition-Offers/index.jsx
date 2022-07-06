import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import TutionController from "../../controller/tutionController";
import "./tuition-offers.scss";
import GlobalContext from "../../store/GlobalContext";
import ProfileController from "../../controller/profileController";
import StudentPanel from "./StudentPanel";
const tutionController = new TutionController();
const profileController = new ProfileController();
// import InputField from "../../components/InputField";

const TuitionOffers = () => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [offers, setOffers] = useState([]);
  const getTutionOffers = async () => {
    const result = await tutionController.getMyOffers();
    setOffers(result.data);
  };
  useEffect(() => {
    getTutionOffers();
    console.log("ON MOUNT");
  }, []);

  const setStudentProfile = async () => {
    const data = await profileController.getProfileByID(globalCtx.selectedUser);
    console.log("TUTOR", data);
    setStudent(data);
  };

  useEffect(() => {
    setStudentProfile();
  }, [globalCtx.selectedUser]);

  //   for (let i = 0; i < 100; i++) {
  //     list.push(<h4>Dihan</h4>);
  //   }
  const OffersList = () => {
    return <ListContainer header="Tuition Offers" list={offers} />;
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
        {student === undefined || globalCtx.selectedUser === -1 ? (
          <SearchFilter />
        ) : (
          <StudentPanel student={student} />
        )}
      </div>
    );
  };
  return (
    <Grid className="tuition-offers-container">
      <OffersList />
      <RightPanel />
    </Grid>
  );
};

export default TuitionOffers;

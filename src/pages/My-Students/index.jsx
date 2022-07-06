import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./my-students.scss";
import StudentsController from "../../controller/studentsController";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "./StudentPanel";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import SearchBox from "../Tuition-Offers/SearchBox";
const tutionController = new TutionController();
const profileController = new ProfileController();
const studentsController = new StudentsController();
// import InputField from "../../components/InputField";

const MyStudents = () => {
  const globalCtx = useContext(GlobalContext);
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState({});
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const setList = async () => {
    const list = await studentsController.getMyTutorsList();
    setStudentsList(list.data);
  };
  useEffect(() => {
    setList();
    console.log(studentsList);
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
  const StudentsList = () => {
    return <ListContainer header="My Students" list={studentsList} />;
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
    <Grid className="my-students-container">
      <StudentsList />
      <RightPanel />
    </Grid>
  );
};

export default MyStudents;

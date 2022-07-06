import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./my-students.scss";
import StudentsController from "../../controller/studentsController";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "./StudentPanel";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import SearchBox from "../Tuition-Offers/SearchBox";
const studentsController = new StudentsController();

const MyStudents = () => {
  const globalCtx = useContext(GlobalContext);
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState({});
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const setList = async () => {
    const list = await studentsController.getMyStudentsList();
    setStudentsList(list.data);
  };
  useEffect(() => {
    setList();
    console.log(studentsList);
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setStudent(studentsList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);

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
        {student === undefined || globalCtx.selectedIndex === -1 ? (
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

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
import SearchBox from "./SearchBox";
import { useSearchParams } from "react-router-dom";
import CourseController from "../../controller/courseController";
const studentsController = new StudentsController();
const courseController = new CourseController();
const MyStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState({});
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const setList = async () => {
    const list = await studentsController.getMyStudentsList();
    setStudentsList(list.data);
  };
  const setFilteredList = async (data) => {
    const list = await courseController.getStudents(data);
    console.log("NEW:", list.data);
    setStudentsList(list.data);
  };
  useEffect(() => {
    setList();
    console.log(studentsList);
  }, []);

  useEffect(() => {
    console.log("###NEEDS UPDATE###");
    console.log("Coaching:", searchParams.get("coaching"));
    console.log("Class:", searchParams.get("class"));
    globalCtx.setPendingUpdate(false);
  }, globalCtx.pendingUpdate);
  useEffect(() => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      setFilteredList({
        coaching: searchParams.get("coaching"),
        class: searchParams.get("class"),
        subject: searchParams.get("subject"),
        batch: searchParams.get("batch"),
      });
    }
  }, [searchParams]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setStudent(studentsList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);

  const StudentsList = () => {
    return <ListContainer header="My Students" list={studentsList} />;
  };
  const SearchFilter = () => {
    return (
      <div className="course-form">
        <SearchBox />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {student === undefined || globalCtx.selectedIndex === -1 ? (
          <SearchBox />
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

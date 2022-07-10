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
import CoachingController from "../../controller/coachingController";
const studentsController = new StudentsController();
const courseController = new CourseController();
const coachingController = new CoachingController();
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
    if (data.class === null) {
      const list = await coachingController.getStudents(data.coaching);
      console.log("NEW:", list.data);
      setStudentsList(list.data);
    } else {
      const list = await courseController.getStudents(data);
      console.log("NEW:", list.data);
      setStudentsList(list.data);
    }
  };

  useEffect(() => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      console.log("APPLY");
      setFilteredList({
        coaching: searchParams.get("coaching"),
        class: searchParams.get("class"),
        subject: searchParams.get("subject"),
        batch: searchParams.get("batch"),
      });
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      console.log("APPLY");
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
    else setStudent({});
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

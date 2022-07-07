import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import StudentsController from "../../controller/studentsController";
import GlobalContext from "../../store/GlobalContext";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import SearchBox from "../Tuition-Offers/SearchBox";
import CourseController from "../../controller/courseController";
import { StudentCourseForm, TutorCourseForm } from "./CourseForm";
import CourseContainer from "./CourseContainer";
import "./my-courses.scss";
const studentsController = new StudentsController();
const courseController = new CourseController();

const MyCourses = () => {
  const globalCtx = useContext(GlobalContext);
  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const setList = async () => {
    if (globalCtx.loggedInAs === "TUTOR") {
      const list = await courseController.getMyListAdmin();
      setCourseList(list.data);
    } else {
      console.log("STUDENT");
      const list = await courseController.getMyList();
      setCourseList(list.data);
    }
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setCourse(courseList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);

  const CourseList = () => {
    return <CourseContainer header="My Courses" list={courseList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {globalCtx.loggedInAs === "TUTOR" ? (
          <TutorCourseForm />
        ) : (
          <StudentCourseForm />
        )}
      </div>
    );
  };
  return (
    <Grid className="my-course-container">
      <CourseList />
      <RightPanel />
    </Grid>
  );
};

export default MyCourses;

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
import Cookies from "universal-cookie";

// import InputField from "../../components/InputField";
const cookies = new Cookies();
const studentsController = new StudentsController();
const courseController = new CourseController();

const MyCourses = () => {
  const globalCtx = useContext(GlobalContext);
  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const type = cookies.get("type");
  const setList = async () => {
    if (type === "TUTOR") {
      const list = await courseController.getMyListAdmin();
      setCourseList(list.data);
    } else {
      console.log("STUDENT");
      const list = await courseController.getMyList();
      setCourseList(list.data);
    }
  };
  useEffect(() => {
    console.log("TYPE: ", type);
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setCourse(courseList[globalCtx.selectedIndex]);
    else setCourse({});
  }, [globalCtx.selectedIndex]);

  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);

  const CourseList = () => {
    return <CourseContainer header="My Courses" list={courseList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {type === "TUTOR" ? <TutorCourseForm /> : <StudentCourseForm />}
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

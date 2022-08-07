import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import GlobalContext from "../../store/GlobalContext";
import CourseController from "../../controller/courseController";
import { StudentCourseForm, TutorCourseForm } from "./CourseForm";
import CourseContainer from "./CourseContainer";
import Cookies from "universal-cookie";
import "./my-courses.scss";
const cookies = new Cookies();
const courseController = new CourseController();

const MyCourses = () => {
  const globalCtx = useContext(GlobalContext);
  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState({});
  const type = cookies.get("type");
  const setList = async () => {
    if (type === "TUTOR") {
      const list = await courseController.getMyListAdmin();
      setCourseList(list.data);
    } else {
      const list = await courseController.getMyList();
      setCourseList(list.data);
    }
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setCourse(courseList[globalCtx.selectedIndex]);
    } else {
      setCourse({});
    }
  }, [globalCtx.selectedIndex, courseList]);

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

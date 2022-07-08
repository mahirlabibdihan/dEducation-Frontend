import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../store/GlobalContext";
import "../../components/components.scss";
import CourseController from "../../controller/courseController";
import { useNavigate, createSearchParams } from "react-router-dom";
const courseController = new CourseController();
export const StudentCourseCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log("Clicked");
    // // if (globalCtx.selectedIndex === props.id) globalCtx.setSelectedIndex(-1);
    // // else globalCtx.setSelectedIndex(props.id);
    // if (globalCtx.loggedInAs === "TUTOR") {
    //   globalCtx.setCourseId(props.course.COURSE_ID);
    //   navigate("/my_courses/batches");
    // }
  };
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      // `${
      //   globalCtx.selectedIndex === props.id ? "active-" : ""
      // }
      className={`course-card student`}
      aria-hidden="true"
      // onClick={handleClick}
    >
      <h6>{`Coaching: ${props.course.NAME}`}</h6>
      <h6>{`Class: ${props.course.CLASS}`}</h6>
      <h6>{`Subject: ${props.course.SUBJECT}`}</h6>
      <h6>{`Starting Date: ${props.course.START_DATE.substring(0, 10)}`}</h6>
      <h6>{`Days: ${props.course.CLASS_DAYS}`}</h6>
      <h6>{`Time: ${props.course.CLASS_TIME}`}</h6>
    </div>
  );
};

export const TutorCourseCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Clicked");
    // if (globalCtx.selectedIndex === props.id) globalCtx.setSelectedIndex(-1);
    // else globalCtx.setSelectedIndex(props.id);
    if (globalCtx.loggedInAs === "TUTOR") {
      // globalCtx.setCourseId(props.course.COURSE_ID);
      // navigate("/my_courses/batches");
      navigate({
        pathname: "/my_courses/batches",
        search: createSearchParams({
          course_id: props.course.COURSE_ID,
        }).toString(),
      });
    }
  };
  useEffect(() => {
    // console.log(globalCtx.selectedIndex, props.user.USER_ID);
  }, [globalCtx.selectedIndex]);
  return (
    <div
      // ${
      //   globalCtx.selectedIndex === props.id ? "active-" : ""
      // }
      className={`course-card tutor`}
      aria-hidden="true"
      onClick={handleClick}
    >
      <h6>{`Coaching: ${props.course.NAME}`}</h6>
      <h6>{`Class: ${props.course.CLASS}`}</h6>
      <h6>{`Subject: ${props.course.SUBJECT}`}</h6>
    </div>
  );
};

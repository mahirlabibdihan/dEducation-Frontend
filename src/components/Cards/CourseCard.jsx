import React, { useContext, useEffect } from "react";
import GlobalContext from "../../store/GlobalContext";
import "../../components/components.scss";
import { useNavigate, createSearchParams } from "react-router-dom";
import { format } from "date-fns";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const StudentCourseCard = (props) => {
  const globalCtx = useContext(GlobalContext);
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
      <h6>{`Coaching: ${props.course.COACHING_NAME}`}</h6>
      <h6>{`Class: ${props.course.CLASS}`}</h6>
      <h6>{`Subject: ${props.course.SUBJECT}`}</h6>
      <h6>{`Starting Date:  ${format(
        new Date(props.course.START_DATE),
        "do MMMM, yyyy"
      )}`}</h6>
      <h6>{`Days: ${props.course.CLASS_DAYS}`}</h6>
      <h6>{`Time: ${props.course.CLASS_TIME}`}</h6>
    </div>
  );
};

export const TutorCourseCard = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const type = cookies.get("type");
  const handleClick = () => {
    // console.log("Clicked");
    // if (globalCtx.selectedIndex === props.id) globalCtx.setSelectedIndex(-1);
    // else globalCtx.setSelectedIndex(props.id);
    if (type === "TUTOR") {
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
      <h6>{`Coaching: ${props.course.COACHING_NAME}`}</h6>
      <h6>{`Class: ${props.course.CLASS}`}</h6>
      <h6>{`Subject: ${props.course.SUBJECT}`}</h6>
    </div>
  );
};
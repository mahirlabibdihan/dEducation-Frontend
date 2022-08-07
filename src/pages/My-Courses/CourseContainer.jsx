import React, { useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../../components/table";
import { useNavigate, createSearchParams } from "react-router-dom";
const cookies = new Cookies();
export const Table = (props) => {
  const type = cookies.get("type");
  return type === "TUTOR" ? (
    <TutorCoursesTable list={props.list} />
  ) : (
    <StudentCoursesTable list={props.list} />
  );
  /*<div className="list">
      
      {props.list.map((course, index) =>
        type === "TUTOR" ? (
          <TutorCourseCard course={course} id={index} />
        ) : (
          <StudentCourseCard course={course} id={index} />
        )
      )}
    </div>*/
};

const CourseContainer = (props) => {
  const navigate = useNavigate();
  const globalCtx = useContext(GlobalContext);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      navigate({
        pathname: "/my_courses/batches",
        search: createSearchParams({
          course_id: props.list[globalCtx.selectedIndex].COURSE_ID,
        }).toString(),
      });
      globalCtx.setSelectedIndex(-1);
    }
  }, [globalCtx.selectedIndex]);
  return (
    <div
      className="list-container"
      // onClick={() => globalCtx.setSelectedIndex(-1)}
      // aria-hidden="true"
    >
      <h2 className="header">{props.header}</h2>
      <Divider />
      <Table list={props.list} className="table-container"></Table>
    </div>
  );
};

export default CourseContainer;

import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../../components/table";
import { useNavigate, createSearchParams } from "react-router-dom";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const cookies = new Cookies();
const SearchBar = ({ setSearchQuery }) => (
  <FormControl className="search-bar" variant="outlined">
    <InputLabel
      htmlFor="outlined-size-small"
      sx={{ shrink: true, margin: "dense" }}
    >
      {/* Search */}
    </InputLabel>
    <OutlinedInput
      id="outlined-size-small"
      className="search-input"
      type="text"
      // place-holder="Search..."
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="-"
      endAdornment={<SearchIcon />}
      // size="small"
      sx={{ width: "26.5vw", height: "5vh" }}
      // InputLabelProps={{ shrink: true }}
    />
  </FormControl>
);
export const Table = (props) => {
  const type = cookies.get("type");
  return type === "TUTOR" ? (
    <TutorCoursesTable list={props.list} query={props.query} />
  ) : (
    <StudentCoursesTable list={props.list} query={props.query} />
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
  const [searchQuery, setSearchQuery] = useState("");
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
      <div className="header-container">
        <h2 className="header">{props.header}</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <Divider />
      <Table
        list={props.list}
        query={searchQuery}
        className="table-container"
      ></Table>
    </div>
  );
};

export default CourseContainer;

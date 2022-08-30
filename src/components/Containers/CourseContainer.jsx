import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Cookies from "universal-cookie";
import { TutorCoursesTable, StudentCoursesTable } from "../Tables/Tables";
import SearchBar from "../InputFields/SearchBar";
import "./styles.scss";
const cookies = new Cookies();
export const Table = (props) => {
  const type = cookies.get("type");
  return type === "TUTOR" ? (
    <TutorCoursesTable list={props.list} query={props.query} />
  ) : (
    <StudentCoursesTable list={props.list} query={props.query} />
  );
};

const CourseContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="table-container">
      <div className="header-container">
        <h2 className="header">{props.header}</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search by coaching"
        />
      </div>
      <Divider />
      <Table list={props.list} query={searchQuery}></Table>
    </div>
  );
};

export default CourseContainer;

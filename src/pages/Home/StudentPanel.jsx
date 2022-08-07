import React from "react";
import StudentProfile from "../../components/StudentProfile";

const StudentPanel = (props) => {
  return (
    <div className="student-panel">
      {props.student === undefined ? (
        <></>
      ) : (
        <StudentProfile student={props.student} />
      )}
    </div>
  );
};

export default StudentPanel;

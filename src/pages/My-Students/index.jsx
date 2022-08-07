import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import "./my-students.scss";
import StudentsController from "../../controller/studentsController";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "../../components/StudentPanel";
import TutionController from "../../controller/tutionController";
import SearchBox from "./SearchBox";
import { useSearchParams } from "react-router-dom";
const studentsController = new StudentsController();
const tutionController = new TutionController();
const MyStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState({});
  const [tutionsList, setTutionsList] = useState([]);
  const [tution, setTution] = useState({});
  const setList = async () => {
    const list1 = await studentsController.getMyStudentsList();
    setStudentsList(list1.data);
    const list2 = await tutionController.getMyTutionsList();
    setTutionsList(list2.data);
  };
  const setFilteredList = async () => {
    const data = {
      coaching: searchParams.get("coaching"),
      class: searchParams.get("class"),
      subject: searchParams.get("subject"),
      batch: searchParams.get("batch"),
    };
    if (data.class === null) {
      const list = await studentsController.getMembersList(data.coaching);
      setStudentsList(list.data);
    } else {
      const list = await studentsController.getEnrolledStudentsList(data);
      setStudentsList(list.data);
    }
  };

  useEffect(() => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      setFilteredList();
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      setFilteredList();
    }
  }, [searchParams]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setStudent(studentsList[globalCtx.selectedIndex]);
      setTution(tutionsList[globalCtx.selectedIndex]);
    } else {
      setStudent({});
      setTution({});
    }
  }, [globalCtx.selectedIndex]);

  const StudentsList = () => {
    return <ListContainer header="My Students" list={studentsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {student === undefined || globalCtx.selectedIndex === -1 ? (
          <SearchBox />
        ) : (
          <StudentPanel student={student} tution={tution} />
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

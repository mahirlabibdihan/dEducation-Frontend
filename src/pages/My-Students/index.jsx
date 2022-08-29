import React, { useState, useEffect } from "react";
import CardContainer from "../../components/Containers/CardContainer";
import StudentsController from "../../controller/studentsController";
import StudentPanel from "../../components/Panels/StudentPanel";
import TutionController from "../../controller/tutionController";
import StudentSearchForm from "../../components/Forms/StudentSearchForm";
// import StudentSearchForm from "../../components/Forms/PendingRequestsForm";
import RightPanel from "../../components/Panels/RightPanel";
import { useSearchParams } from "react-router-dom";
import MainContainer from "../../components/Containers/MainContainer";
const studentsController = new StudentsController();
const tutionController = new TutionController();
const StudentsList = ({ list }) => {
  return <CardContainer header="My Students" list={list} />;
};
const Right = ({ student, tution }) => {
  return (
    <RightPanel>
      {student === undefined || tution === undefined ? (
        <StudentSearchForm />
      ) : (
        <StudentPanel student={student} tution={tution} />
      )}
    </RightPanel>
  );
};
const MyStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState(undefined);
  const [tutionsList, setTutionsList] = useState([]);
  const [tution, setTution] = useState(undefined);
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
    let list;
    if (data.class === null) {
      list = await studentsController.getMembersList(data.coaching);
      setStudentsList(list.data);
    } else {
      list = await studentsController.getEnrolledStudentsList(data);
      setStudentsList(list.data);
    }
  };
  const setShowableList = () => {
    if (searchParams.get("coaching") === null) {
      setList();
    } else {
      setFilteredList();
    }
  };
  useEffect(() => setShowableList(), []);

  useEffect(() => setShowableList(), [searchParams]);
  useEffect(() => {
    if (searchParams.get("id") !== null) {
      const index = studentsList
        .map((s) => s.USER_ID)
        .indexOf(Number(searchParams.get("id")));
      setStudent(studentsList[index]);
      setTution(tutionsList[index]);
    } else {
      setStudent(undefined);
      setTution(undefined);
    }
  }, [searchParams, studentsList, tutionsList]);
  return (
    <MainContainer>
      <StudentsList list={studentsList} />
      <Right student={student} tution={tution} />
    </MainContainer>
  );
};

export default MyStudents;

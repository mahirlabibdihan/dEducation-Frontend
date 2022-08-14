import React, { useState, useEffect, useRef, useContext } from "react";
import CardContainer from "../../components/Containers/CardContainer";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "../../components/Panels/StudentPanel";
import StudentsController from "../../controller/studentsController";
import { useSearchParams } from "react-router-dom";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
import PendingRequestsForm from "../../components/Forms/PendingRequestsForm";
import CoachingController from "../../controller/coachingController";
const tutionController = new TutionController();
const studentsController = new StudentsController();
const coachingController = new CoachingController();
const OffersList = ({ list }) => {
  return <CardContainer header="Tuition Offers" list={list} />;
};
const PendingRequests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [offersList, setOffersList] = useState([]);
  const [offer, setOffer] = useState(undefined);
  const [student, setStudent] = useState(undefined);
  const [studentsList, setStudentsList] = useState([]);
  const [coaching, setCoaching] = useState(undefined);
  const [course, setCourse] = useState(undefined);
  const setShowableList = async () => {
    console.log("Need new list");
    const data = {
      request_type: searchParams.get("type"),
      coaching: searchParams.get("coaching"),
      class: searchParams.get("class"),
      subject: searchParams.get("subject"),
      batch: searchParams.get("batch"),
    };
    console.log(data);
    if (data.request_type === "Tution Offer" || data.request_type === null) {
      const list1 = await studentsController.getPendingStudentsList();
      if (list1.success) setStudentsList(list1.data);
      const list2 = await tutionController.getPendingTutionsList();
      if (list2.success) setOffersList(list2.data);
      setCoaching(undefined);
      setCourse(undefined);
    } else if (data.request_type === "Join Request") {
      const list1 = await studentsController.getJoinRequests(data.coaching);
      if (list1.success) setStudentsList(list1.data);
      const result = await coachingController.getInfo(data.coaching);
      if (result.success) setCoaching(result.data);
      setCourse(undefined);
      setOffer(undefined);
    } else if (data.request_type === "Course Enroll") {
      const list1 = await studentsController.getPendingEnrolls(data);
      if (list1.success) setStudentsList(list1.data);
      const result = await coachingController.getInfo(data.coaching);
      setCoaching(undefined);
      setOffer(undefined);
      if (result.success) {
        setCourse({
          coaching: result.data.NAME,
          class: data.class,
          subject: data.subject,
          batch: data.batch,
        });
      }
    }
  };
  useEffect(() => {
    setShowableList();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setShowableList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    if (searchParams.get("id") !== null) {
      setStudent(studentsList[Number(searchParams.get("id"))]);
      if (
        searchParams.get("type") === null ||
        searchParams.get("type") === "Pending Requests"
      )
        setOffer(offersList[Number(searchParams.get("id"))]);
    } else {
      setStudent(undefined);
      setOffer(undefined);
    }
  }, [searchParams, studentsList, offersList]);

  return (
    <MainContainer>
      <OffersList list={studentsList} />
      <RightPanel>
        {student === undefined ? (
          <PendingRequestsForm />
        ) : (
          <StudentPanel
            student={student}
            offer={offer}
            coaching={coaching}
            course={course}
          />
        )}
      </RightPanel>
    </MainContainer>
  );
};

export default PendingRequests;

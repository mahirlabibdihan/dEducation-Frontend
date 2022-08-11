import React, { useState, useEffect, useRef, useContext } from "react";
import CardContainer from "../../components/Containers/CardContainer";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "../../components/Panels/StudentPanel";
import StudentsController from "../../controller/studentsController";
import { useSearchParams } from "react-router-dom";
import MainContainer from "../../components/Containers/MainContainer";
import RightPanel from "../../components/Panels/RightPanel";
const tutionController = new TutionController();
const studentsController = new StudentsController();
const OffersList = ({ list }) => {
  return <CardContainer header="Tuition Offers" list={list} />;
};
const TuitionOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [offersList, setOffersList] = useState([]);
  const [offer, setOffer] = useState(undefined);
  const [student, setStudent] = useState(undefined);
  const [studentsList, setStudentsList] = useState([]);
  const setTutionOffers = async () => {
    const list1 = await studentsController.getPendingStudentsList();
    setStudentsList(list1.data);
    const list2 = await tutionController.getPendingTutionsList();
    setOffersList(list2.data);
  };
  useEffect(() => {
    setTutionOffers();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setTutionOffers();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    if (searchParams.get("id") !== null) {
      setStudent(studentsList[Number(searchParams.get("id"))]);
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
        {offer === undefined || student === undefined ? (
          <></>
        ) : (
          <StudentPanel student={student} offer={offer} />
        )}
      </RightPanel>
    </MainContainer>
  );
};

export default TuitionOffers;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import TutionController from "../../controller/tutionController";
import "./tuition-offers.scss";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "../../components/StudentPanel";
import StudentsController from "../../controller/studentsController";
import { useSearchParams } from "react-router-dom";
const tutionController = new TutionController();
const studentsController = new StudentsController();
const RightPanel = ({ student, offer }) => {
  return (
    <div className="right-panel">
      {offer === undefined || student === undefined ? (
        <></>
      ) : (
        <StudentPanel student={student} offer={offer} />
      )}
    </div>
  );
};
const OffersList = ({ list }) => {
  return <ListContainer header="Tuition Offers" list={list} />;
};
const TuitionOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalCtx = useContext(GlobalContext);
  const [offersList, setOffersList] = useState([]);
  const [offer, setOffer] = useState({});
  const [student, setStudent] = useState({});
  const [studentsList, setStudentsList] = useState([]);
  const getTutionOffers = async () => {
    const list1 = await studentsController.getPendingStudentsList();
    setStudentsList(list1.data);
    const list2 = await tutionController.getPendingTutionsList();
    setOffersList(list2.data);
  };
  useEffect(() => {
    getTutionOffers();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      getTutionOffers();
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
    <Grid className="tuition-offers-container">
      <OffersList list={studentsList} />
      <RightPanel student={student} offer={offer} />
    </Grid>
  );
};

export default TuitionOffers;

import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import TutionController from "../../controller/tutionController";
import "./tuition-offers.scss";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "../../components/StudentPanel";
import StudentsController from "../../controller/studentsController";
const tutionController = new TutionController();
const studentsController = new StudentsController();
const TuitionOffers = () => {
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
    if (globalCtx.selectedIndex !== -1) {
      setStudent(studentsList[globalCtx.selectedIndex]);
      setOffer(offersList[globalCtx.selectedIndex]);
    } else {
      setStudent({});
      setOffer({});
    }
  }, [globalCtx.selectedIndex]);

  const OffersList = () => {
    return <ListContainer header="Tuition Offers" list={studentsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {offer === undefined || globalCtx.selectedIndex === -1 ? (
          <></>
        ) : (
          <StudentPanel student={student} offer={offer} />
        )}
      </div>
    );
  };
  return (
    <Grid className="tuition-offers-container">
      <OffersList />
      <RightPanel />
    </Grid>
  );
};

export default TuitionOffers;

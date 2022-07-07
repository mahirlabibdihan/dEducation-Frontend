import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import StudentsController from "../../controller/studentsController";
import GlobalContext from "../../store/GlobalContext";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
import SearchBox from "../Tuition-Offers/SearchBox";
import CourseController from "../../controller/courseController";
import { BatchForm } from "./BatchForm";
import BatchContainer from "./BatchContainer";
import "./batches.scss";
const studentsController = new StudentsController();
const courseController = new CourseController();

const Batches = () => {
  const globalCtx = useContext(GlobalContext);
  const [batchList, setBatchList] = useState([]);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const setList = async () => {
    const list = await courseController.getBatches(globalCtx.courseId);
    setBatchList(list.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setCourse(batchList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);

  const BatchList = () => {
    return <BatchContainer header="Batches" list={batchList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        <BatchForm />
      </div>
    );
  };
  return (
    <Grid className="batch-container">
      <BatchList />
      <RightPanel />
    </Grid>
  );
};

export default Batches;

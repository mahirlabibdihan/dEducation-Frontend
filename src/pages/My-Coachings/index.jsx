import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import CoachingForm from "./CoachingForm";
import CoachingController from "../../controller/coachingController";
import { StudentCoachingPanel, TutorCoachingPanel } from "./CoachingPanel";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import "./my-coachings.scss";
const coachingController = new CoachingController();
const cookies = new Cookies();
const MyCoachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});
  const type = cookies.get("type");
  const setList = async () => {
    const res = await coachingController.getMyList();
    setCoachingsList(res.data);
  };
  useEffect(() => {
    setList();
  }, []);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setCoaching(coachingsList[globalCtx.selectedIndex]);
    } else {
      setCoaching({});
    }
  }, [globalCtx.selectedIndex, coachingsList]);
  const CoachingCreator = () => {
    return (
      <div className="coaching-creator">
        <CoachingForm />
      </div>
    );
  };
  const CoachingsList = () => {
    return <ListContainer header="My Coachings" list={coachingsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {coaching !== undefined && globalCtx.selectedIndex !== -1 ? (
          type === "TUTOR" ? (
            <TutorCoachingPanel coaching={coaching} />
          ) : (
            <StudentCoachingPanel coaching={coaching} />
          )
        ) : type === "TUTOR" ? (
          <CoachingCreator />
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <Grid className="my-coachings-container">
      <CoachingsList />
      <RightPanel />
    </Grid>
  );
};

export default MyCoachings;

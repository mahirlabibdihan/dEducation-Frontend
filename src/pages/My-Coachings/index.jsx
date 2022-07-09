import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import CoachingForm from "./CoachingForm";
import CoachingController from "../../controller/coachingController";
import "./my-coachings.scss";
import CoachingPanel from "./CoachingPanel";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();

const MyCoachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});
  const type = globalCtx.loggedInAs;
  const setList = async () => {
    const result = await coachingController.getMyList();
    setCoachingsList(result.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setCoaching(coachingsList[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
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
          <CoachingPanel coaching={coaching} />
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

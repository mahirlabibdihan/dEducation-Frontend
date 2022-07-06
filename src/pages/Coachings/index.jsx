import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import GlobalContext from "../../store/GlobalContext";
import CoachingController from "../../controller/coachingController";
import CoachingPanel from "./CoachingPanel";
import "./coachings.scss";
const coachingController = new CoachingController();

const Coachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});
  const setList = async () => {
    const result = await coachingController.getList();
    setCoachingsList(result.data);
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1)
      setCoaching(globalCtx.selectedIndex[globalCtx.selectedIndex]);
  }, [globalCtx.selectedIndex]);
  const CoachingsList = () => {
    return <ListContainer header="Coachings" list={coachingsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {coaching !== undefined && globalCtx.selectedIndex !== -1 ? (
          <CoachingPanel coaching={coaching} />
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <Grid className="coachings-container">
      <CoachingsList />
      <RightPanel />
    </Grid>
  );
};

export default Coachings;

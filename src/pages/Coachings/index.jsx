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
  const [joinList, setJoinList] = useState([]);
  const [isJoined, setIsJoined] = useState({});
  const setList = async () => {
    const result1 = await coachingController.getList();
    setCoachingsList(result1.data);
    const result2 = await coachingController.getJoinList();
    setJoinList(result2.data);
  };
  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setCoaching(coachingsList[globalCtx.selectedIndex]);
      setIsJoined(joinList[globalCtx.selectedIndex]);
    } else {
      setCoaching({});
      setIsJoined({});
    }
  }, [globalCtx.selectedIndex, coachingsList, joinList]);
  const CoachingsList = () => {
    return <ListContainer header="Coachings" list={coachingsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {coaching !== undefined && globalCtx.selectedIndex !== -1 ? (
          <CoachingPanel coaching={coaching} isJoined={isJoined} />
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

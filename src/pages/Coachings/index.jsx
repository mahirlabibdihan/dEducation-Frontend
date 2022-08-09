import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import GlobalContext from "../../store/GlobalContext";
import CoachingController from "../../controller/coachingController";
import CoachingPanel from "../../components/CoachingPanel";
import { useSearchParams } from "react-router-dom";
import "./coachings.scss";
const coachingController = new CoachingController();

const CoachingsList = ({ list }) => {
  return <ListContainer header="Coachings" list={list} />;
};
const RightPanel = ({ coaching, isJoined }) => {
  return (
    <div className="right-panel">
      {coaching !== undefined && isJoined !== undefined ? (
        <CoachingPanel coaching={coaching} isJoined={isJoined} />
      ) : (
        <></>
      )}
    </div>
  );
};

const Coachings = () => {
  const globalCtx = useContext(GlobalContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState(undefined);
  const [joinList, setJoinList] = useState([]);
  const [isJoined, setIsJoined] = useState(undefined);
  const setList = async () => {
    const res1 = await coachingController.getList();
    setCoachingsList(res1.data);
    const res2 = await coachingController.getJoinList();
    setJoinList(res2.data);
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
    if (searchParams.get("id") !== null) {
      setCoaching(coachingsList[Number(searchParams.get("id"))]);
      setIsJoined(joinList[Number(searchParams.get("id"))]);
    } else {
      setCoaching(undefined);
      setIsJoined(undefined);
    }
  }, [searchParams, coachingsList, joinList]);

  return (
    <div className="coachings-container">
      <CoachingsList list={coachingsList} />
      <RightPanel coaching={coaching} isJoined={isJoined} />
    </div>
  );
};

export default Coachings;

import React, { useState, useEffect, useContext } from "react";
import CardContainer from "../../components/Containers/CardContainer";
import GlobalContext from "../../store/GlobalContext";
import CoachingController from "../../controller/coachingController";
import CoachingPanel from "../../components/Panels/CoachingPanel";
import { useSearchParams } from "react-router-dom";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
const coachingController = new CoachingController();

const CoachingsList = ({ list }) => {
  return <CardContainer header="Coachings" list={list} />;
};
const Coachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState(undefined);
  const [joinList, setJoinList] = useState([]);
  const [isJoined, setIsJoined] = useState(undefined);
  const setList = async () => {
    const res1 = await coachingController.getList();
    setCoachingsList(res1.data);
    console.log(res1.data);
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
      const index = coachingsList
        .map((t) => t.COACHING_ID)
        .indexOf(Number(searchParams.get("id")));
      setCoaching(coachingsList[index]);
      setIsJoined(joinList[index]);
    } else {
      setCoaching(undefined);
      setIsJoined(undefined);
    }
  }, [searchParams, coachingsList, joinList]);

  return (
    <MainContainer className="coachings-container">
      <CoachingsList list={coachingsList} />
      <RightPanel>
        {coaching !== undefined && isJoined !== undefined ? (
          <CoachingPanel coaching={coaching} isJoined={isJoined} />
        ) : (
          <></>
        )}
      </RightPanel>
    </MainContainer>
  );
};

export default Coachings;

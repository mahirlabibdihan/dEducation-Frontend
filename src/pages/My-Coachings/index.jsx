import React, { useState, useEffect, useContext } from "react";
import CardContainer from "../../components/Containers/CardContainer";
import CoachingForm from "../../components/Forms/CoachingForm";
import CoachingController from "../../controller/coachingController";
import { TutorCoachingPanel } from "../../components/Panels/PrivateCoachingPanel";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { useSearchParams } from "react-router-dom";
import RightPanel from "../../components/Panels/RightPanel";
import CoachingPanel from "../../components/Panels/CoachingPanel";
import MainContainer from "../../components/Containers/MainContainer";
const coachingController = new CoachingController();
const cookies = new Cookies();
const CoachingsList = ({ list }) => {
  return <CardContainer header="My Coachings" list={list} />;
};

const Right = ({ coaching }) => {
  const type = cookies.get("type");
  return (
    <RightPanel>
      {coaching !== undefined ? (
        type === "TUTOR" ? (
          <TutorCoachingPanel coaching={coaching} />
        ) : (
          <CoachingPanel coaching={coaching} />
        )
      ) : type === "TUTOR" ? (
        <CoachingForm />
      ) : (
        <></>
      )}
    </RightPanel>
  );
};
const MyCoachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState(undefined);

  const setList = async () => {
    const res = await coachingController.getMyList();
    setCoachingsList(res.data);
    // console.log(r)
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
    if (searchParams.get("id") !== null) {
      const index = coachingsList
        .map((t) => t.COACHING_ID)
        .indexOf(Number(searchParams.get("id")));
      setCoaching(coachingsList[index]);
    } else {
      setCoaching(undefined);
    }
  }, [searchParams, coachingsList]);

  return (
    <MainContainer className="my-coachings-container">
      <CoachingsList list={coachingsList} />
      <Right coaching={coaching} />
    </MainContainer>
  );
};

export default MyCoachings;

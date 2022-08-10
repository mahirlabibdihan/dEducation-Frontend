import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ListContainer from "../../components/ListContainer";
import CoachingForm from "./CoachingForm";
import CoachingController from "../../controller/coachingController";
import { TutorCoachingPanel } from "./CoachingPanel";
import GlobalContext from "../../store/GlobalContext";
import Cookies from "universal-cookie";
import { useSearchParams } from "react-router-dom";
import "./my-coachings.scss";
import CoachingPanel from "../../components/CoachingPanel";
const coachingController = new CoachingController();
const cookies = new Cookies();
const CoachingsList = ({ list }) => {
  return <ListContainer header="My Coachings" list={list} />;
};

const CoachingCreator = () => {
  return (
    <div className="coaching-creator">
      <CoachingForm />
    </div>
  );
};
const RightPanel = ({ coaching }) => {
  const type = cookies.get("type");
  return (
    <div className="right-panel">
      {coaching !== undefined ? (
        type === "TUTOR" ? (
          <TutorCoachingPanel coaching={coaching} />
        ) : (
          <CoachingPanel coaching={coaching} />
        )
      ) : type === "TUTOR" ? (
        <CoachingCreator />
      ) : (
        <></>
      )}
    </div>
  );
};
const MyCoachings = () => {
  const globalCtx = useContext(GlobalContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});

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
    if (searchParams.get("id") !== null) {
      setCoaching(coachingsList[Number(searchParams.get("id"))]);
    } else {
      setCoaching(undefined);
    }
  }, [searchParams, coachingsList]);

  return (
    <Grid className="my-coachings-container">
      <CoachingsList list={coachingsList} />
      <RightPanel coaching={coaching} />
    </Grid>
  );
};

export default MyCoachings;

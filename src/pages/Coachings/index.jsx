import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./coachings.scss";
import GlobalContext from "../../store/GlobalContext";
import CoachingController from "../../controller/coachingController";
import CoachingPanel from "./CoachingPanel";
const coachingController = new CoachingController();
// import InputField from "../../components/InputField";

const Coachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});
  const navigate = useNavigate();
  const [type, setType] = useState("TUTOR");
  const setList = async () => {
    const result = await coachingController.getList();
    for (let i = 0; i < result.data.length; i++) {
      result.data[i]["USER_ID"] = result.data[i].COACHING_ID;
    }
    setCoachingsList(result.data);
  };
  useEffect(() => {
    setList();
    console.log(setCoachingsList);
  }, []);

  const setCoachingProfile = async () => {
    const result = await coachingController.getInfo(globalCtx.selectedUser);
    console.log("TUTOR", result.data);
    setCoaching(result.data);
  };

  useEffect(() => {
    setCoachingProfile();
  }, [globalCtx.selectedUser]);
  const CoachingsList = () => {
    return <ListContainer header="Coachings" list={coachingsList} />;
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {coaching !== undefined && globalCtx.selectedUser !== -1 ? (
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

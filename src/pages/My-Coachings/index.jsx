import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
// import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import CoachingForm from "./CoachingForm";
import CoachingController from "../../controller/coachingController";
import "./my-coachings.scss";
import CoachingPanel from "./CoachingPanel";
import GlobalContext from "../../store/GlobalContext";
const coachingController = new CoachingController();

// import InputField from "../../components/InputField";

const MyCoachings = () => {
  const globalCtx = useContext(GlobalContext);
  const [coachingsList, setCoachingsList] = useState([]);
  const [coaching, setCoaching] = useState({});
  const navigate = useNavigate();
  const [type, setType] = useState(globalCtx.loggedInAs);
  const setList = async () => {
    const result = await coachingController.getMyList();
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
        {coaching !== undefined && globalCtx.selectedUser !== -1 ? (
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

import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import CourseController from "../../controller/courseController";
import CourseContainer from "../../components/Containers/CourseContainer";
import Cookies from "universal-cookie";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
import AddCourseForm from "../../components/Forms/AddCourseForm";
import CreateCourseForm from "../../components/Forms/CreateCourseForm";
import ScheduleContainer from "../../components/Containers/ScheduleContainer";
import { Divider } from "@mui/material";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProfileController from "../../controller/profileController";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Fields from "../../components/InputFields/Fields";
import "./my-schedule.scss";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import Calendar from "@mui/lab/Ca";
// import { setNotification } from "../../components/Containers/Layout";

const cookies = new Cookies();
const courseController = new CourseController();
const profileController = new ProfileController();

const ScheduleList = ({ date, setDate, list }) => {
  return (
    <div className="posts-feed">
      <div className="hbox header-container">
        <h2 className="header">My Schedule</h2>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            size="small"
            label="Date"
            inputFormat="eeee, do MMMM, yyyy"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "26.5vw",
                }}
                size="small"
              />
            )}
            className="date-picker"
          />
        </LocalizationProvider>
      </div>
      <Divider />
      <ScheduleContainer list={list} />
    </div>
  );
};
const MySchedule = () => {
  const globalCtx = useContext(GlobalContext);
  const [scheduleList2, setScheduleList2] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [date, setDate] = useState(new Date());
  const setList = async () => {
    const list = await profileController.getSchedule();
    setScheduleList(list.data);
  };
  const setList2 = async () => {
    const list = [];
    for (let i in scheduleList) {
      // console.log(s);
      if (new Date(scheduleList[i].START_DATE) <= date) {
        const days = scheduleList[i].CLASS_DAYS.split(", ");
        for (let j in days) {
          console.log(days[j], Fields.day[date.getDay()]);
          if (days[j] === Fields.day[date.getDay()]) {
            console.log(":", days[j], Fields.day[date.getDay()]);
            list.push(scheduleList[i]);
            break;
          }
        }
      }
    }
    setScheduleList2(list);
  };
  useEffect(() => {
    setList();
  }, []);
  useEffect(() => {
    setList2();
  }, [scheduleList]);
  useEffect(() => {
    setList2();
  }, [date]);

  return (
    <MainContainer className="schedule-container">
      <ScheduleList date={date} setDate={setDate} list={scheduleList2} />
    </MainContainer>
  );
};

export default MySchedule;

import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import MainContainer from "../../components/Containers/MainContainer";
import ScheduleContainer from "../../components/Containers/ScheduleContainer";
import { Button, Divider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProfileController from "../../controller/profileController";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Fields from "../../components/InputFields/Fields";
import "./my-schedule.scss";
import { InputAdornment } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
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
            inputFormat="eee, MMM d, yyyy"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="hbox" style={{ gap: ".1rem" }}>
                        <Button
                          className="blue-button"
                          style={{
                            padding: 0,
                            minWidth: "30px",
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={() => {
                            setDate(
                              new Date(date.getTime() - 24 * 60 * 60 * 1000)
                            );
                          }}
                        >
                          <ArrowLeft />
                        </Button>
                        <Button
                          className="blue-button"
                          style={{
                            padding: 0,
                            minWidth: "30px",
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={() => {
                            setDate(
                              new Date(date.getTime() + 24 * 60 * 60 * 1000)
                            );
                          }}
                        >
                          <ArrowRight />
                        </Button>
                        {/* <PlayCircleIcon /> */}
                      </div>
                    </InputAdornment>
                  ),
                }}
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

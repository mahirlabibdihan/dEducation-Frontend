import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../../controller/tutionController";
import GlobalContext from "../../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../../App";
import Zoom from "@mui/material/Zoom";
import "./Schedule.scss";
import { API_BASE_URL } from "../..";
const tutionController = new TutionController();
// const Schedule = (props) => {
//   // Similar to facebook post
//   const cookies = new Cookies();
//   const type = cookies.get("type");
//   const globalCtx = useContext(GlobalContext);
//   const navigate = new useNavigate();
//   return (
//     <div className="schedule-card">
//       <div className="hbox poppins-font content">
//         <div className="time-card">
//           <h6>
//             {format(new Date(props.schedule.START_TIME.slice(0, -1)), "h:mm a")}
//             {" - "}
//             {format(new Date(props.schedule.END_TIME.slice(0, -1)), "h:mm a")}
//           </h6>
//         </div>

//         <img
//           src={`http://localhost:5000/assets/images/${props.schedule.IMAGE}`}
//           alt=" "
//           className="shadow-sm small-image"
//         />
//         <h6 className="flex-center mb-0">
//           <b>{props.schedule.NAME}</b>
//           {` (${props.schedule.SUBJECTS})`}
//         </h6>
//       </div>
//     </div>
//   );
// };

const Schedule = ({ schedule, x, y, w }) => {
  const cookies = new Cookies();
  return (
    // <Zoom in={true}>
    <div
      className="schedule-card"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
      }}
    >
      <div className="hbox poppins-font content">
        <img
          src={`${API_BASE_URL}/assets/images/${schedule.IMAGE}`}
          alt=" "
          className="shadow-sm very-small-image"
        />
        <div className="schedule-details vbox">
          <h6 className="name">
            <b>{schedule.NAME}</b>
          </h6>
          <h6 className="subjects">{schedule.SUBJECTS}</h6>
          <h6 className="time-range">
            {format(new Date(schedule.START_TIME.slice(0, -1)), "h:mm a")}
            {" - "}
            {format(new Date(schedule.END_TIME.slice(0, -1)), "h:mm a")}
          </h6>
        </div>
      </div>
    </div>
    // </Zoom>
  );
};
export default Schedule;

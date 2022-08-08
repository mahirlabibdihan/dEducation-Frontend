import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import TutionController from "../controller/tutionController";
import GlobalContext from "../store/GlobalContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import { showToast } from "../App";
const tutionController = new TutionController();
const TutionPost = (props) => {
  const cookies = new Cookies();
  const globalCtx = useContext(GlobalContext);
  const navigate = new useNavigate();
  const data = props.data;
  const type = cookies.get("type");
  const handleApply = async (event) => {
    const res = await tutionController.apply(data.POST_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const handleCancel = async (event) => {
    const res = await tutionController.cancelApplication(data.POST_ID);
    if (res.success) {
      globalCtx.setPendingUpdate(true);
    }
  };
  const handleApplicants = async (event) => {
    // globalCtx.setPostId(data.POST_ID);
    navigate({
      pathname: "/req_tutor/applicants",
      search: createSearchParams({
        post_id: data.POST_ID,
      }).toString(),
    });
    // navigate("/req_tutor/applicants");
  };
  const tutionPostDetails = [
    [
      { label: "Class", value: data.CLASS },
      { label: "Tution Type", value: data.TYPE },
      { label: "Student Gender", value: data.GENDER },
    ],

    [
      { label: "Medium", value: data.VERSION },
      { label: "Desired Tutor", value: data.DESIRED_TUTOR_GENDER },
      { label: "Location", value: data.ADDRESS },
    ],
    [
      { label: "Subjects", value: data.SUBJECTS },
      { label: "Salary", value: data.SALARY },
      { label: "Tutoring Days", value: `${data.DAYS_PER_WEEK} Days / Week` },
    ],
  ];
  return (
    <Grid className="tution-post">
      <div className="hbox">
        {tutionPostDetails.map((row) => {
          return (
            <div className="vbox">
              {row.map((col) => (
                <h6>{`${col.label}: ${col.value}`}</h6>
              ))}
            </div>
          );
        })}
      </div>
      <div className="hbox">
        <h6 className="time-stamp">
          {format(new Date(data.TIMESTAMP), "dd MMM, yyyy hh:mm a")}
        </h6>
        <h6 className="time-stamp">
          {`Applications: ${data.APPLICANT_COUNT}`}
        </h6>
        {type === "STUDENT" ? (
          <Button className="apply-button" onClick={handleApplicants}>
            Applicants
          </Button>
        ) : props.isApplied === undefined || props.isApplied === "NO" ? (
          <Button className="apply-button" onClick={handleApply}>
            Apply
          </Button>
        ) : (
          <Button className="cancel-apply-button" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Grid>
  );
};

export default TutionPost;

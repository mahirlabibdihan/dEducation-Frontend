import React from "react";
import { Button, Grid } from "@mui/material";
const TutionPost = (props) => {
  const data = props.data;
  const tutionPostDetails = [
    [
      { label: "Class", value: data.CLASS },
      { label: "Tution Type", value: data.TYPE },
      { label: "Student Gender", value: data.GENDER },
    ],

    [
      { label: "Version", value: data.VERSION },
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
      <Button className="apply-button">Apply</Button>
      {/* <h3>{data.title}</h3>
      <div className="vbox">
        <div className="hbox">
          <h4>{`Tuition Type: ${data.TYPE}`}</h4>
          <h4>{`Subject: ${data.SUBJECTS}`}</h4>
        </div>
        <div className="hbox">
          <h4>{`Tutoring Days: ${data.DAYS_PER_WEEK}`}</h4>
          <h4>{`Salary: ${data.SALARY}`}</h4>
        </div>
        <div className="hbox">
          <h4>{`Desired Tutor Gender: ${data.DESIRED_TUTOR_GENDER}`}</h4>
        </div>
      </div> */}
    </Grid>
  );
};

export default TutionPost;

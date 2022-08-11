import React from "react";
import "./TutionDetails.scss";
const TutionDetails = (props) => {
  const OfferDetails = [
    { label: "Tution Type", value: props.tution.TYPE },
    { label: "Salary (BDT)", value: props.tution.SALARY },
    {
      label: "Tutoring Days",
      value: `${props.tution.DAYS_PER_WEEK} Days / Week`,
    },
    { label: "Subjects", value: props.tution.SUBJECTS },
  ];
  const StudentEnd = (props) => {
    return props.tution.STATUS === "PENDING" ? (
      <h6>
        {`You have offered ${props.tutorName} to teach you 
          ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. 
          Classes will be taken ${props.tution.TYPE} and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    ) : (
      <h6>
        {`${props.tutorName} teaches you ${props.tution.SUBJECTS} 
          ${props.tution.DAYS_PER_WEEK} days a week. Classes are taken ${props.tution.TYPE} 
          and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    );
  };
  const TutorEnd = (props) => {
    return props.tution.STATUS === "PENDING" ? (
      <h6>
        {`${props.studentName} has offered you to teach 
          ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. 
          Classes will be taken ${props.tution.TYPE} and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    ) : (
      <h6>
        {`You teach ${props.studentName} ${props.tution.SUBJECTS} ${props.tution.DAYS_PER_WEEK} days a week. Classes are taken ${props.tution.TYPE} 
        and salary ${props.tution.SALARY} BDT per month.`}
      </h6>
    );
  };
  return (
    <div className="tution-offer">
      <div className="vbox">
        {props.type === "tutor" ? (
          <TutorEnd tution={props.tution} studentName={props.studentName} />
        ) : (
          <StudentEnd tution={props.tution} tutorName={props.tutorName} />
        )}
        {/* {OfferDetails.map((row) => {
            return <h6>{`${row.label}: ${row.value}`}</h6>;
          })} */}
      </div>
    </div>
  );
};

export default TutionDetails;

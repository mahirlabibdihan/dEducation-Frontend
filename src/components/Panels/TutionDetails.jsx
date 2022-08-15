import React from "react";
import "./TutionDetails.scss";
import { format } from "date-fns";
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
    return props.tution.STATUS === "PENDING" ||
      props.tution.STATUS === "UPDATE" ? (
      <h6>
        {`You have offered ${props.tutorName} to teach you 
          ${props.tution.SUBJECTS} on ${props.tution.CLASS_DAYS} at ${
          props.tution.CLASS_TIME
        }.   
          Classes will be taken ${props.tution.TYPE} and salary ${
          props.tution.SALARY
        } BDT per month from ${format(
          new Date(props.tution.START_DATE),
          "do MMMM, yyyy"
        )}.`}
      </h6>
    ) : (
      <h6>
        {`${props.tutorName} teaches you ${props.tution.SUBJECTS} 
        on ${props.tution.CLASS_DAYS} at ${
          props.tution.CLASS_TIME
        }. Classes are taken ${props.tution.TYPE} 
          and salary ${props.tution.SALARY} BDT per month from  ${format(
          new Date(props.tution.START_DATE),
          "do MMMM, yyyy"
        )}.`}
      </h6>
    );
  };
  const TutorEnd = (props) => {
    return props.tution.STATUS === "PENDING" ||
      props.tution.STATUS === "UPDATE" ? (
      <h6>
        {`${props.studentName} has offered you to teach 
          ${props.tution.SUBJECTS} on ${props.tution.CLASS_DAYS} at ${
          props.tution.CLASS_TIME
        }. 
          Classes will be taken ${props.tution.TYPE} and salary ${
          props.tution.SALARY
        } BDT per month from  ${format(
          new Date(props.tution.START_DATE),
          "do MMMM, yyyy"
        )}.`}
      </h6>
    ) : (
      <h6>
        {`You teach ${props.studentName} ${props.tution.SUBJECTS} on ${
          props.tution.CLASS_DAYS
        } at ${props.tution.CLASS_TIME}. Classes are taken ${props.tution.TYPE} 
        and salary ${props.tution.SALARY} BDT per month from  ${format(
          new Date(props.tution.START_DATE),
          "do MMMM, yyyy"
        )}.`}
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

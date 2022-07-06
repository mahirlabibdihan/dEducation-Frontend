import React, { useState, useContext, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import GlobalContext from "../../store/GlobalContext";
import { PublicProfilePic } from "../../components/ProfilePic";
import TutionController from "../../controller/tutionController";
import ProfileController from "../../controller/profileController";
const tutionController = new TutionController();
const profileController = new ProfileController();

export const TutorProfile = (props) => {
  const tutor = props.tutor;
  const profileDetails = [
    [
      { label: "Gender", value: tutor.GENDER },
      { label: "Salary", value: tutor.PREFFERED_SALARY },
    ],

    [
      { label: "Status", value: tutor.STATUS },
      { label: "Experience", value: tutor.YEARS_OF_EXPERIENCE },
    ],
  ];
  return (
    <div className="profile-banner">
      <div className="profile-picture">
        <PublicProfilePic image={tutor.IMAGE} />
      </div>

      <div className="banner-details">
        <h3 className="">{tutor.NAME}</h3>
        <Divider />
        <div className="full-details vbox">
          <div className="hbox">
            {profileDetails.map((row) => {
              return (
                <div className="vbox">
                  {row.map((col) => (
                    <h6>{`${col.label}: ${col.value}`}</h6>
                  ))}
                </div>
              );
            })}
          </div>
          <h6>{`Phone Number: ${tutor.PHONE_NUMBER}`}</h6>
          <h6>{`Subjects: ${tutor.SUBJECTS}`}</h6>
        </div>
      </div>
    </div>
  );
};

const TutorPanel = (props) => {
  console.log(props.tutor.TUTOR_ID);
  const [tutor, setTutor] = useState(props.tutor);

  const OfferDetails = () => {
    const OfferDetails = [
      { label: "Tution Type", value: props.tution.TYPE },
      { label: "Salary (BDT)", value: props.tution.SALARY },
      {
        label: "Tutoring Days",
        value: `${props.tution.DAYS_PER_WEEK} Days / Week`,
      },
      { label: "Subjects", value: props.tution.SUBJECTS },
    ];
    return (
      <div className="tution-offer">
        <div className="vbox">
          {OfferDetails.map((row) => {
            return <h6>{`${row.label}: ${row.value}`}</h6>;
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="tutor-panel">
      {tutor === undefined ? (
        <></>
      ) : (
        <>
          <TutorProfile tutor={tutor} />
          <Divider />
          <OfferDetails />
          {/* <OfferForm tutor_id={tutor.TUTOR_ID} tution={props.tution} /> */}
        </>
      )}
    </div>
  );
};

export default TutorPanel;

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

const OfferForm = (props) => {
  const [values, setValues] = useState({
    type: "",
    desired_tutor_gender: "",
    subjects: "",
    days_per_week: "",
    salary: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const tutorRequestForm = [
    {
      label: "Tuition Type",
      id: "type",
      value: values.type,
    },
    {
      label: "Subjects",
      id: "subjects",
      value: values.subjects,
    },
    {
      label: "Days / Week",
      id: "days_per_week",
      value: values.days_per_week,
    },
    {
      label: "Salary (BDT)",
      id: "salary",
      value: values.salary,
    },
  ];
  const handleOffer = async (event) => {
    console.log(props);
    const result = await tutionController.offer(values, props.tutor_id);
    console.log(result);
    if (result.success) {
      window.location.reload();
    }
  };
  return (
    <div className="offer-form">
      {/* <h1 className="header"> Need a tutor? </h1> */}
      <Divider />
      <div className="input-fields">
        {tutorRequestForm.map((field) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button
        variant="contained"
        className="offer-button"
        onClick={handleOffer}
      >
        Offer
      </Button>
    </div>
  );
};

const TutorPanel = (props) => {
  console.log(props.tutor.TUTOR_ID);
  const [tutor, setTutor] = useState(props.tutor);
  const ProfileBanner = () => {
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

  return (
    <div className="tutor-panel">
      {tutor === undefined ? (
        <></>
      ) : (
        <>
          <ProfileBanner />
          <Divider />
          <OfferForm tutor_id={tutor.TUTOR_ID} />
        </>
      )}
    </div>
  );
};

export default TutorPanel;

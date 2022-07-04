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

const StudentPanel = (props) => {
  // console.log(props.tutor.TUTOR_ID);
  const [student, setStudent] = useState(props.student);
  const [offer, setOffer] = useState({});
  const setTutionOffer = async () => {
    const result = await tutionController.getOffer(student.STUDENT_ID);
    console.log("OFFER", result);
    setOffer(result.data);
  };
  useEffect(() => {
    setTutionOffer();
  }, []);
  const ProfileBanner = () => {
    const profileDetails = [
      [{ label: "Class", value: student.CLASS }],
      [{ label: "Version", value: student.VERSION }],
      [{ label: "Gender", value: student.GENDER }],
    ];
    return (
      <div className="profile-banner">
        <div className="profile-picture">
          <PublicProfilePic image={student.IMAGE} />
        </div>

        <div className="banner-details">
          <h2 className="">{student.NAME}</h2>
          <Divider />
          <div className="full-details">
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
            <h6>{`Institution: ${student.INSTITUTION}`}</h6>
            <h6>{`Phone Number: ${student.PHONE_NUMBER}`}</h6>
            <h6>{`Address: ${student.ADDRESS}`}</h6>
          </div>
        </div>
      </div>
    );
  };
  const OfferDetails = () => {
    const OfferDetails = [
      { label: "Tution Type", value: offer.TYPE },
      { label: "Salary (BDT)", value: offer.SALARY },
      { label: "Tutoring Days", value: `${offer.DAYS_PER_WEEK} Days / Week` },
      { label: "Subjects", value: offer.Subjects },
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
    <div className="student-panel">
      {student === undefined ? (
        <></>
      ) : (
        <>
          <ProfileBanner />
          <Divider />
          {offer === undefined ? <></> : <OfferDetails />}
          <Button variant="contained" className="accept-button">
            Accept
          </Button>
        </>
      )}
    </div>
  );
};

export default StudentPanel;

import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
const ProfileSettings = () => {
  const [values, setValues] = useState({
    name: "",
    gender: "",
    dob: "",
    institution: "",
    phone: "",
    city: "",
    district: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="profile-details">
      <h1 className="header">Profile Settings</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Full Name",
            id: "name",
            value: values.name,
          },
          {
            label: "Gender",
            id: "gender",
            value: values.gender,
          },
          {
            label: "Date Of Birth",
            id: "dob",
            value: values.dob,
          },
          {
            label: "Institution",
            id: "institution",
            value: values.institution,
          },
          {
            label: "Phone Number",
            id: "phone",
            value: values.phone,
          },
          {
            label: "City",
            id: "city",
            value: values.city,
          },
          {
            label: "District",
            id: "ditrict",
            value: values.district,
          },
        ].map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button variant="contained" className="save-button">
        Save
      </Button>
    </div>
  );
};

export default ProfileSettings;

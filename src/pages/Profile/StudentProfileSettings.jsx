import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import SelectionField from "../../components/SelectionField";
import { format } from "date-fns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { setLoading } from "../../App";
import Fields from "../../components/Fields";
const profileController = new ProfileController();
const StudentProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    class: "",
    version: "",
    institution: "",
    address: "",
  });
  const setProfileData = async () => {
    const res = await profileController.getProfile();
    const data = res.data;
    console.log("CHILD: ", data.DATE_OF_BIRTH);
    setUser({
      name: data.NAME,
      gender: data.GENDER,
      // dob: format(, "MM/dd/yyyy"),
      dob: data.DATE_OF_BIRTH == null ? "" : new Date(data.DATE_OF_BIRTH),
      phone: data.PHONE_NUMBER,
      email: data.EMAIL,
      class: data.CLASS,
      version: data.VERSION,
      institution: data.INSTITUTION,
      address: data.ADDRESS,
    });
  };
  useEffect(() => {
    // setLoading(true);
    setProfileData();
  }, []);
  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };
  const handleSave = async (event) => {
    const res = await profileController.setProfile({
      name: user.name,
      gender: user.gender,
      dob: format(user.dob, "MM/dd/yyyy"),
      phone: user.phone,
      email: user.email,
      class: user.class,
      version: user.version,
      institution: user.institution,
      address: user.address,
    });
    if (res.success) {
      await setProfileData();
    }
  };

  const inputFields = [
    // {
    //   label: "Full Name",
    //   id: "name",
    //   value: user.name,
    // },
    // {
    //   label: "Gender",
    //   id: "gender",
    //   value: user.gender,
    // },
    // {
    //   label: "Date of Birth",
    //   id: "dob",
    //   // value: format(new Date(user.DATE_OF_BIRTH), "do MMMM, yyyy"),
    //   value: user.dob,
    // },
    // {
    //   label: "Class",
    //   id: "class",
    //   value: user.class,
    // },
    // {
    //   label: "Version",
    //   id: "version",
    //   value: user.version,
    // },
    {
      label: "Institution",
      id: "institution",
      value: user.institution,
    },
    {
      label: "Phone Number",
      id: "phone",
      value: user.phone,
    },
    {
      label: "Address",
      id: "address",
      value: user.address,
    },
  ];
  return (
    <div className="profile-details">
      <h2 className="header">Profile</h2>
      <Divider />
      <div className="input-fields">
        <InputField2
          label="Full Name"
          type="text"
          value={user.name}
          id="name"
          onChange={handleChange}
        />
        <SelectionField
          label="Gender"
          value={user.gender}
          id="gender"
          onChange={handleChange}
          list={["Male", "Female"]}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date of Birth"
            inputFormat="MM/dd/yyyy"
            value={user.dob}
            onChange={(date) => {
              console.log(date);
              setUser({ ...user, dob: date });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "100%",
                }}
              />
            )}
            className="date-picker"
          />
        </LocalizationProvider>
        <SelectionField
          label="Class"
          value={user.class}
          id="class"
          onChange={handleChange}
          list={Fields.class}
        />
        <SelectionField
          label="Version"
          value={user.version}
          id="version"
          onChange={handleChange}
          list={["Bangla Medium", "English Medium", "English Version"]}
        />

        {/* 
        <SelectionField
          label="Version"
          value={user.version}
          id="version"
          onChange={handleChange}
          list={["Bangla", "English"]}
        ></SelectionField> */}
        {inputFields.map((field, index) => (
          <InputField2
            label={field.label}
            type="text"
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button variant="contained" className="save-button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default StudentProfileSettings;

import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import ProfileController from "../../controller/profileController";
import { format } from "date-fns";
import { TutorProfileSettingsFields, EducationFields } from "../InputFields";
const profileController = new ProfileController();
const TutorProfileSettings = () => {
  const [user, setUser] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    subjects: [],
    salary: "",
    experience: "",
    status: "",
  });
  const [newEducation, setNewEducation] = useState({
    eq_id: null,
    institute: "",
    field_of_study: "",
    degree: "",
    passing_year: "",
  });

  const [educationsList, setEducationsList] = useState([]);
  const setProfileData = async () => {
    const res = await profileController.getProfile();
    const data = res.data;
    setUser({
      name: data.NAME,
      gender: data.GENDER,
      dob: new Date(data.DATE_OF_BIRTH),
      phone: data.PHONE_NUMBER,
      email: data.EMAIL,
      subjects: data.EXPERTISE.split(", "),
      salary: data.PREFFERED_SALARY,
      experience: data.YEARS_OF_EXPERIENCE,
      status: data.AVAILABILITY,
    });
    const res2 = await profileController.getEducation();
    const list = [];
    const fields = [];
    for (let i = 0; i < res2.data.length; i++) {
      list.push({
        eq_id: res2.data[i].EQ_ID,
        institute: res2.data[i].INSTITUTE,
        field_of_study: res2.data[i].FIELD_OF_STUDY,
        degree: res2.data[i].DEGREE,
        passing_year: res2.data[i].PASSING_YEAR,
      });
      fields.push(getEducationField(list[list.length - 1]));
    }
    setEducationsList(list);
    setEducationFields(fields);
  };
  useEffect(() => {
    setProfileData();
  }, []);
  const [educationFields, setEducationFields] = useState([]);
  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleAdd = (e) => {
    educationsList.push(newEducation);
    setEducationsList(educationsList);
    setNewEducation({
      eq_id: null,
      institute: "",
      field_of_study: "",
      degree: "",
      passing_year: "",
    });
    educationFields.push(getEducationField(newEducation));
    setEducationFields(educationFields);
  };
  const handleDelete = (index) => (e) => {
    const list1 = [];
    for (let i = 0; i < educationsList.length; i++) {
      if (i !== index) {
        list1.push(educationsList[i]);
      }
    }
    setEducationsList(list1);
    const list2 = [];
    for (let i = 0; i < educationFields.length; i++) {
      if (i !== index) {
        list2.push(educationFields[i]);
      }
    }
    setEducationFields(list2);
  };
  const handleNewEducationChange = (prop) => (event) => {
    setNewEducation({ ...newEducation, [prop]: event.target.value });
  };
  const handleOldEducationChange = (prop, index) => (event) => {
    educationsList[index][prop] = event.target.value;
    setEducationsList((current) =>
      current.map((obj, id) => {
        if (id === index) {
          return { ...obj, [prop]: event.target.value };
        }
        return obj;
      })
    );
    educationFields[index] = getEducationField(educationsList[index]);
    setEducationFields(educationFields);
  };
  const handleSave = async (event) => {
    const res1 = await profileController.setProfile({
      name: user.name,
      gender: user.gender,
      dob: format(user.dob, "MM/dd/yyyy"),
      phone: user.phone,
      email: user.email,
      subjects: user.subjects.join(", "),
      salary: user.salary,
      experience: user.experience,
      status: user.status,
    });
    const res2 = await profileController.setEducation(educationsList);
  };

  const getEducationField = (education) => {
    return [
      {
        label: "Institute",
        id: "institute",
        value: education.institute,
      },
      {
        label: "Field of Study",
        id: "field_of_study",
        value: education.field_of_study,
      },
      {
        label: "Degree",
        id: "degree",
        value: education.degree,
      },
      {
        label: "Passing Year",
        id: "passing_year",
        value: education.passing_year,
      },
    ];
  };
  const newEducationFields = getEducationField(newEducation);
  return (
    <div className="profile-details">
      <h2 className="header">Profile</h2>
      <Divider />
      <TutorProfileSettingsFields
        user={user}
        setUser={setUser}
        handleChange={handleChange}
      />
      <h4>Educational Qualification</h4>
      <EducationFields
        educationFields={educationFields}
        handleOldEducationChange={handleOldEducationChange}
        newEducationFields={newEducationFields}
        handleNewEducationChange={handleNewEducationChange}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
      />
      <Button
        variant="contained"
        className="blue-button standard-button-width horizontal-center mt-3"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default TutorProfileSettings;

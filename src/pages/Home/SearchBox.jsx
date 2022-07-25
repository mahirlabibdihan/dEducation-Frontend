import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputField";
import { Button } from "@mui/material";
const SearchBox = () => {
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
  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <div className="input-fields">
        {[
          {
            label: "Salary",
            id: "days_per_week",
            value: values.days_per_week,
          },
          {
            label: "Subjects",
            id: "subjects",
            value: values.subjects,
          },
          {
            label: "Gender",
            id: "desired_tutor_gender",
            value: values.desired_tutor_gender,
          },
          {
            label: "Status",
            id: "type",
            value: values.type,
          },
          {
            label: "Experience",
            id: "salary",
            value: values.salary,
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
      <Button variant="contained" className="apply-button">
        Search
      </Button>
    </div>
  );
};

export default SearchBox;

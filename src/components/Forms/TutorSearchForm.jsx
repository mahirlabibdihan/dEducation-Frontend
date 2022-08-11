import React, { useState, useContext } from "react";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
import { TutorSearchFields } from "../InputFields";
import "../../components/components.scss";
import { SearchButton } from "../Buttons";
const TutorSearchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    desired_tutor_gender: "Any",
    start_salary: 0,
    end_salary: 100000,
    status: "Any",
    experience: 0,
  };
  const [values, setValues] = useState(initValues);
  useEffect(() => {
    setValues({
      ...values,
      end_salary: Math.max(values.start_salary, values.end_salary),
    });
  }, [values.start_salary]);
  useEffect(() => {
    if (searchParams.get("gender") !== null) {
      setValues({
        desired_tutor_gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        status: searchParams.get("status"),
        experience: searchParams.get("experience"),
      });
    }
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSearch = (event) => {
    const tmp = new URLSearchParams();
    tmp.set("gender", values.desired_tutor_gender);
    tmp.set("start", values.start_salary);
    tmp.set("end", values.end_salary);
    tmp.set("status", values.status);
    tmp.set("experience", values.experience);
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
  };
  const handleClear = (event) => {
    const tmp = new URLSearchParams();
    setSearchParams(tmp);
    setValues(initValues);
    globalCtx.setPendingUpdate(true);
  };
  return (
    <div className="search-box">
      <h1 className="header">Filter</h1>
      <Divider />
      <TutorSearchFields values={values} handleChange={handleChange} />
      <SearchButton handleSearch={handleSearch} handleClear={handleClear} />
    </div>
  );
};

export default TutorSearchForm;
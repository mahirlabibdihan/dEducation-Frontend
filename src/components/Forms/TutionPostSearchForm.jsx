import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import GlobalContext from "../../store/GlobalContext";
import { TutionPostSearchFields } from "../InputFields";
import { SearchButton } from "../Buttons";
import { Zoom } from "@mui/material";
const TutionPostSearchForm = () => {
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initValues = {
    start_salary: 0,
    end_salary: 100000,
    days_per_week: 7,
    version: "Any",
    gender: "Any",
    tution_type: "Any",
    class: "Any",
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
        gender: searchParams.get("gender"),
        start_salary: searchParams.get("start"),
        end_salary: searchParams.get("end"),
        days_per_week: searchParams.get("days"),
        version: searchParams.get("version"),
        tution_type: searchParams.get("type"),
        class: searchParams.get("class"),
      });
    }
  }, []);
  const handleSearch = (event) => {
    const tmp = new URLSearchParams();
    tmp.set("gender", values.gender);
    tmp.set("start", values.start_salary);
    tmp.set("end", values.end_salary);
    tmp.set("days", values.days_per_week);
    tmp.set("version", values.version);
    tmp.set("type", values.tution_type);
    tmp.set("class", values.class);
    setSearchParams(tmp);
    globalCtx.setPendingUpdate(true);
  };
  const handleClear = (event) => {
    const tmp = new URLSearchParams();
    setSearchParams(tmp);
    setValues(initValues);
    globalCtx.setPendingUpdate(true);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Zoom in={true}>
      <div className="search-box">
        <h1 className="header">Filter</h1>
        <Divider />
        <TutionPostSearchFields values={values} handleChange={handleChange} />
        <SearchButton handleSearch={handleSearch} handleClear={handleClear} />
      </div>
    </Zoom>
  );
};

export default TutionPostSearchForm;

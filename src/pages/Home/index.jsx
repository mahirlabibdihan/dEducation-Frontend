import React, { useState, useEffect } from "react";
import StudentHome from "./StudentHome";
import TutorHome from "./TutorHome";
import Cookies from "universal-cookie";
import "./home.scss";
const cookies = new Cookies();
const Home = () => {
  const [type, setType] = useState("");
  const setHomeType = async () => {
    setType(cookies.get("type"));
  };
  useEffect(() => {
    setHomeType();
  }, []);

  return (
    <div className="home-container">
      {type === "STUDENT" ? (
        <StudentHome />
      ) : type === "TUTOR" ? (
        <TutorHome />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import TutionPost from "../Cards/TutionPost";
import TutionController from "../../controller/tutionController";
import { useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Notice from "../Cards/Notice";
const tutionController = new TutionController();
const NoticeContainer = (props) => {
  const cookies = new Cookies();
  const type = cookies.get("type");
  const globalCtx = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="notices-list">
      {props.list.map((notice, index) => (
        <Notice notice={notice} />
      ))}
    </div>
  );
};

export default NoticeContainer;

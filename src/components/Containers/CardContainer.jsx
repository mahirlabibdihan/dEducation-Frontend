import React, { useState } from "react";
import { Divider } from "@mui/material";

import UserCard from "../Cards/UserCard";
import SearchBar from "../InputFields/SearchBar";
import "./CardContainer.scss";

export const List = (props) => {
  return (
    <div className="cards">
      {props.list.map((user, index) =>
        user.NAME.toLowerCase().startsWith(props.query.toLowerCase()) ? (
          <UserCard user={user} id={index} />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

const CardContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="card-container">
      <div className="header-container">
        <h2 className="header">{props.header}</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search by name"
        />
      </div>
      <Divider />
      <List list={props.list} query={searchQuery}></List>
    </div>
  );
};

export default CardContainer;

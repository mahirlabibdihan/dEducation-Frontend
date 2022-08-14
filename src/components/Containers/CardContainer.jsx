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
          user.USER_ID === undefined ? (
            user.COACHING_ID === undefined ? (
              <></>
            ) : (
              <UserCard user={user} id={user.COACHING_ID} />
            )
          ) : (
            <UserCard user={user} id={user.USER_ID} />
          )
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

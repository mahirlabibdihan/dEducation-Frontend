import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import "./ListContainer.scss";
import UserCard from "./UserCard";
import SearchIcon from "@mui/icons-material/Search";
import GlobalContext from "../store/GlobalContext";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputField from "./InputField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
// import SearchIcon from "@mui/icons-material/Search";
// import InputField from "../../components/InputField";

export const List = (props) => {
  return (
    <div className="list">
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

const SearchBar = ({ setSearchQuery }) => (
  <FormControl className="search-bar" variant="outlined">
    <InputLabel
      htmlFor="outlined-size-small"
      sx={{ shrink: true, margin: "dense" }}
    >
      {/* Search */}
    </InputLabel>
    <OutlinedInput
      id="outlined-size-small"
      className="search-input"
      type="text"
      // place-holder="Search..."
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="-"
      endAdornment={<SearchIcon />}
      // size="small"
      sx={{ width: "26.5vw", height: "5vh" }}
      // InputLabelProps={{ shrink: true }}
    />
  </FormControl>
);

const ListContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="list-container">
      <div className="header-container">
        <h2 className="header">{props.header}</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <Divider />
      <List list={props.list} query={searchQuery}></List>
    </div>
  );
};

export default ListContainer;

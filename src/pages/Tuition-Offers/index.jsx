import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { InputField2 } from "../../components/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";
import ListContainer from "../../components/ListContainer";
import "./tuition-offers.scss";

// import InputField from "../../components/InputField";

const TuitionOffers = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ON MOUNT");
  }, []);
  const list = [];

  //   for (let i = 0; i < 100; i++) {
  //     list.push(<h4>Dihan</h4>);
  //   }
  const OffersList = () => {
    return <ListContainer header="Tuition Offers" />;
  };
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  return (
    <Grid className="tuition-offers-container">
      <OffersList />
      <SearchFilter />
    </Grid>
  );
};

export default TuitionOffers;

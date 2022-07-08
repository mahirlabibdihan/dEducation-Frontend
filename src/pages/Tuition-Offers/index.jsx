import React, { useState, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import ListContainer from "../../components/ListContainer";
import TutionController from "../../controller/tutionController";
import "./tuition-offers.scss";
import GlobalContext from "../../store/GlobalContext";
import StudentPanel from "./StudentPanel";
const tutionController = new TutionController();

const TuitionOffers = () => {
  const globalCtx = useContext(GlobalContext);
  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState({});
  const getTutionOffers = async () => {
    const result = await tutionController.getMyOffers();
    setOffers(result.data);
  };
  useEffect(() => {
    getTutionOffers();
    console.log("ON MOUNT");
  }, []);
  useEffect(() => {
    if (globalCtx.selectedIndex !== -1) {
      setOffer(offers[globalCtx.selectedIndex]);
    }
  }, [globalCtx.selectedIndex]);

  const OffersList = () => {
    return <ListContainer header="Tuition Offers" list={offers} />;
  };
  const SearchFilter = () => {
    return (
      <div className="search-filter">
        <SearchBox />
      </div>
    );
  };
  const RightPanel = () => {
    return (
      <div className="right-panel">
        {offer === undefined || globalCtx.selectedIndex === -1 ? (
          <></>
        ) : (
          <StudentPanel offer={offer} />
        )}
      </div>
    );
  };
  return (
    <Grid className="tuition-offers-container">
      <OffersList />
      <RightPanel />
    </Grid>
  );
};

export default TuitionOffers;

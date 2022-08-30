import React from "react";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import UserCard from "../../components/Cards/UserCard";
import Zoom from "@mui/material/Zoom";

const CardSmallContainer = (props) => {
  const navigate = useNavigate();
  return (
    <div className="short-list-container">
      <h2 className="header">{props.header}</h2>
      <Divider />
      <Zoom in={props.list.length > 0}>
        <div className="short-list-box">
          <div className="short-list">
            {props.list.map((tutor, index) => (
              <UserCard className="scroll" user={tutor} />
            ))}
          </div>

          <Button
            variant="contained"
            className="next-button"
            onClick={() => {
              setTimeout(() => {
                navigate(props.path);
              }, 300);
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "2.3rem" }} />
            {/* <ArrowRightIcon sx={{ fontSize: "4rem" }} /> */}
          </Button>
        </div>
      </Zoom>
    </div>
  );
};

export default CardSmallContainer;

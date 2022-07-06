import { Divider } from "@mui/material";
import { PublicProfilePic } from "./ProfilePic";
const CoachingBanner = (props) => {
  return (
    <div className="profile-banner">
      <div className="profile-picture">
        <PublicProfilePic image={props.coaching.IMAGE} />
      </div>

      <div className="banner-details">
        <h3 className="">{props.coaching.NAME}</h3>
        <Divider />
        <h6>{`Phone Number: ${props.coaching.PHONE_NUMBER}`}</h6>
        <h6>{`Address: ${props.coaching.ADDRESS}`}</h6>
      </div>
    </div>
  );
};

export default CoachingBanner;

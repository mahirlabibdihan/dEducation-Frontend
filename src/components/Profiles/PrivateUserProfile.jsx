import ProfilePic from "../ProfilePic";
const PrivateUserProfile = (props) => {
  return (
    <div className="profile-banner">
      <div className="profile-picture">
        <ProfilePic />
      </div>

      <div className="banner-details">
        <h2 className="">{props.name}</h2>
      </div>
    </div>
  );
};
export default PrivateUserProfile;

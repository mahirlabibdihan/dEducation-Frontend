import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import "./profile.scss";
const Login = () => {
  const { user } = useContext(AuthContext);
  // const params = useParams();
  return (
    <Grid className="profile-container ">
      <Sidebar />
      <div className="profile-card rounded shadow">
        <div className="profile-banner">
          <div className="profile-picture">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Admin"
              width="140"
            />
          </div>
          <div className="banner-details">
            <h1>{user.username}</h1>
          </div>
        </div>
        <div className="profile-details"></div>
      </div>
    </Grid>
  );
};

export default Login;

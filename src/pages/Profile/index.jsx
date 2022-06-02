import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Sidebar } from "../../components";

import "./profile.scss";
const Login = () => {
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
          <div className="banner-details"></div>
        </div>
        <div className="profile-details"></div>
      </div>
    </Grid>
  );
};

export default Login;

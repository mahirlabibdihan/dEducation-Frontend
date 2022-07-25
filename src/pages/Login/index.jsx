import Grid from "@mui/material/Grid";
import LoginForm from "./LoginForm";
import HomeIcon from "@mui/icons-material/Home";
import "./login.scss";
const Login = () => {
  return (
    <Grid className="login-container">
      {/* <HomeIcon /> */}
      <LoginForm />
    </Grid>
  );
};

export default Login;

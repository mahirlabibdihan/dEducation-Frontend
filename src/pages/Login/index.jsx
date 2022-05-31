import Grid from "@mui/material/Grid";
import { LoginForm } from "../../components";
import "./login.scss";
const Login = () => {
  return (
    <Grid className="loginContainer">
      <LoginForm />
    </Grid>
  );
};

export default Login;

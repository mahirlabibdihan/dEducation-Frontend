import Grid from "@mui/material/Grid";
import { LoginForm, Sidebar } from "../../components";
import "./login.scss";
const Login = () => {
  return (
    <Grid className="login-container">
      <LoginForm />
    </Grid>
  );
};

export default Login;

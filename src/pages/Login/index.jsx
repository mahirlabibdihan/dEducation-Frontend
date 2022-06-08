import Grid from "@mui/material/Grid";
import LoginForm from "./LoginForm";
import "./login.scss";
const Login = () => {
  return (
    <Grid className="login-container">
      <LoginForm />
    </Grid>
  );
};

export default Login;

import Grid from "@mui/material/Grid";
import { SignUpForm, Background } from "../../components";
import "./signUp.scss";
const SignUp = () => {
  return (
    <Grid className="signUpContainer">
      <SignUpForm />
    </Grid>
  );
};

export default SignUp;

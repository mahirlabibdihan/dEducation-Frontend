import Grid from "@mui/material/Grid";
import "./FormContainer.scss";
export const FormContainer = (props) => {
  return (
    <Grid className="form-container">
      <>{props.children}</>
    </Grid>
  );
};

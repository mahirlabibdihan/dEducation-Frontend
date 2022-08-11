import { Button } from "@mui/material";
export const SearchButton = ({ handleSearch, handleClear }) => (
  <>
    <Button
      variant="contained"
      className="blue-button full-width"
      onClick={handleSearch}
    >
      Search
    </Button>
    <Button
      variant="contained"
      className="red-button full-width"
      onClick={handleClear}
    >
      Reset
    </Button>
  </>
);

export const RestrictedButton = ({ isDisabled, onClick, label }) =>
  isDisabled ? (
    <Button
      variant="contained"
      className="disabled-button full-width"
      onClick={onClick}
      disabled
    >
      {label}
    </Button>
  ) : (
    <Button
      variant="contained"
      className="blue-button full-width"
      onClick={onClick}
    >
      {label}
    </Button>
  );

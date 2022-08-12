import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
const SearchBar = ({ setSearchQuery, label }) => (
  <FormControl
    className="search-bar"
    variant="outlined"
    sx={{ width: "26.5vw" }}
  >
    <TextField
      id="input-with-icon-textfield"
      className="search-input"
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      size="small"
      // sx={{ width: "26.5vw }}
      variant="outlined"
      fullWidth
    />
  </FormControl>
);

export default SearchBar;

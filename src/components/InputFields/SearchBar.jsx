import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ setSearchQuery }) => (
  <FormControl className="search-bar" variant="outlined">
    <InputLabel
      htmlFor="outlined-size-small"
      sx={{ shrink: true, margin: "dense" }}
    >
      {/* Search */}
    </InputLabel>
    <OutlinedInput
      id="outlined-size-small"
      className="search-input"
      type="text"
      // place-holder="Search..."
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="-"
      endAdornment={<SearchIcon />}
      // size="small"
      sx={{ width: "26.5vw", height: "5vh" }}
      // InputLabelProps={{ shrink: true }}
    />
  </FormControl>
);

export default SearchBar;

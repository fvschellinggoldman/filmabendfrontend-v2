import React, { FC } from "react";
import styles from "./SearchBar.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { MovieSearchResult } from "../../types/movie";
import { getRequest } from "../../api/api";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (searchResults: MovieSearchResult[]) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = async (value: string) => {
    // search using input
    const searchResult: MovieSearchResult[] = await getRequest("/api/search", {
      search_string: value,
    });
    onSearch(searchResult);
  };

  const debounced = useDebouncedCallback((value) => {
    onSearch([]);
    handleSearch(value);
  }, 1000);

  const handleSearchChange = (event: { target: { value: any } }) => {
    debounced(event.target.value);
  };

  return (
    <div className={styles.SearchBar}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;

import React, { FC, useState } from "react";
import styles from "./SearchBar.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { MovieSearchResult } from "../../types/movie";
import { getRequest } from "../../api/api";

interface SearchBarProps {
  onSearch: (searchResults: MovieSearchResult[]) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    // search using input
    const searchResult: MovieSearchResult[] = await getRequest("/api/search", {
      search_string: searchQuery,
    });
    onSearch(searchResult);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchChange = (event: { target: { value: any } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.SearchBar}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onKeyPress={handleKeyPress}
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

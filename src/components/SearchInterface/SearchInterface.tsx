import React, { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInterface.module.scss";
import { Event } from "../../types/event";
import { Button } from "@mui/material";
import AssistantIcon from "@mui/icons-material/Assistant";
import { User } from "../../types/user";

interface SearchInterfaceProps {
  event: Event;
  user: User;
  suggestionModalHandler: () => void;
}

const SearchInterface: FC<SearchInterfaceProps> = ({
  event,
  user,
  suggestionModalHandler,
}) => {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  return (
    <div className={styles.SearchInterfaceWrapper}>
      <div className={styles.SearchBarWrapper}>
        <SearchBar onSearch={setSearchResults}></SearchBar>
        {user?.displayName === "Fabio" && (
          <Button
            className={styles.SuggestionButton}
            variant="outlined"
            startIcon={<AssistantIcon />}
            onClick={() => {
              suggestionModalHandler();
            }}
          ></Button>
        )}
      </div>
      <SearchResults
        searchResults={searchResults}
        event={event}
      ></SearchResults>
    </div>
  );
};

export default SearchInterface;

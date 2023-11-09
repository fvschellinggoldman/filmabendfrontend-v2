import { List, ListItem } from "@mui/material";
import React, { FC } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  searchResults: MovieSearchResult[];
}

const SearchResults: FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div className={styles.SearchResults}>
      <List>
        {searchResults.map((searchResult) => (
          <ListItem key={searchResult.title}>
            <SearchResult
              searchResult={searchResult}
              eventId={5}
            ></SearchResult>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchResults;

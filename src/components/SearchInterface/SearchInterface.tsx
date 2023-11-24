import React, { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInterface.module.scss";
import { Event } from "../../types/event";

interface SearchInterfaceProps {
  event: Event;
}

const SearchInterface: FC<SearchInterfaceProps> = ({ event }) => {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);

  return (
    <div className={styles.SearchInterfaceWrapper}>
      <SearchBar onSearch={setSearchResults}></SearchBar>
      <SearchResults
        searchResults={searchResults}
        event={event}
      ></SearchResults>
    </div>
  );
};

export default SearchInterface;

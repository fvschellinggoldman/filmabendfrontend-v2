import React, { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInterface.module.scss";

interface SearchInterfaceProps {
  eventId: number;
}

const SearchInterface: FC<SearchInterfaceProps> = ({ eventId }) => {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);

  return (
    <div className={styles.SearchInterfaceWrapper}>
      <SearchBar onSearch={setSearchResults}></SearchBar>
      <SearchResults
        searchResults={searchResults}
        eventId={eventId}
      ></SearchResults>
    </div>
  );
};

export default SearchInterface;

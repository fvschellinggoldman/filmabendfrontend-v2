import React, { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInterface.module.scss";

interface SearchInterfaceProps {}

const SearchInterface: FC<SearchInterfaceProps> = () => {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);

  return (
    <div className={styles.SearchInterfaceWrapper}>
      <SearchBar onSearch={setSearchResults}></SearchBar>
      <SearchResults searchResults={searchResults}></SearchResults>
    </div>
  );
};

export default SearchInterface;

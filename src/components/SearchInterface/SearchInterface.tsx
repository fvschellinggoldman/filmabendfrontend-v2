import React, { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInterface.module.scss";
import { Event } from "../../types/event";
import { Button, Dialog, Tooltip } from "@mui/material";
import AssistantIcon from "@mui/icons-material/Assistant";
import { User } from "../../types/user";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionElement";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";

interface SearchInterfaceProps {
  event: Event;
  user: User;
}

const SearchInterface: FC<SearchInterfaceProps> = ({ event, user }) => {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [showMovieSuggestionModal, setShowMovieSuggestionModal] =
    useState(false);
  const handleOpenSuggestionModal = () => {
    setShowMovieSuggestionModal(true);
  };
  const handleCloseSuggestionModal = () => {
    setShowMovieSuggestionModal(false);
  };
  const { movieSuggestion } = useFetchMovieEventSuggestions(event.id);

  return (
    <div className={styles.SearchInterfaceWrapper}>
      <div className={styles.SearchBarWrapper}>
        <SearchBar onSearch={setSearchResults}></SearchBar>
        {movieSuggestion && (
          <Tooltip title="AI Suggestion">
            <Button
              className={styles.SuggestionButton}
              variant="outlined"
              startIcon={<AssistantIcon />}
              onClick={handleOpenSuggestionModal}
            ></Button>
          </Tooltip>
        )}
        <Dialog
          open={showMovieSuggestionModal}
          onClose={handleCloseSuggestionModal}
          maxWidth="lg"
        >
          <MovieSuggestionElement
            handleCloseSuggestionModal={handleCloseSuggestionModal}
            eventId={event.id}
          ></MovieSuggestionElement>
        </Dialog>
      </div>
      <SearchResults
        searchResults={searchResults}
        event={event}
      ></SearchResults>
    </div>
  );
};

export default SearchInterface;

import { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import { Event } from "../../types/event";
import { Dialog } from "@mui/material";
import { User } from "../../types/user";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionElement";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

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
    <div className={"w-full sm:w-1/4"}>
      <div className={"flex flex-row align-items justify-center px-2"}>
        <SearchBar onSearch={setSearchResults}></SearchBar>
        {movieSuggestion && (
          <Button
            variant="outline"
            onClick={handleOpenSuggestionModal}
            className={
              "[&_svg]:size-6 h-14 w-14 m-2 border-[#ba8f9b] hover:border-neutral-950"
            }
          >
            <Bot />
          </Button>
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

import { FC, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Event } from "../../types/event";
import { Dialog } from "@mui/material";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionElement";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

interface SearchInterfaceProps {
  event: Event;
}

const SearchInterface: FC<SearchInterfaceProps> = ({ event }) => {
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
    <div
      className={
        "flex flex-row align-items justify-center gap-2 px-2 mx-2 mt-2"
      }
    >
      <SearchBar event={event} />
      {movieSuggestion && (
        <Button
          variant="outline"
          onClick={handleOpenSuggestionModal}
          className={
            "[&_svg]:size-6 h-14 w-14 border-[#ba8f9b] hover:border-neutral-950"
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
  );
};

export default SearchInterface;

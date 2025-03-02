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
    <div className={"flex flex-row grow align-items justify-center gap-2 px-2"}>
      <div className="flex grow justify-center">
        <SearchBar event={event} />
      </div>
      <div className="flex justify-center align-items sm:w-[120px]">
        {movieSuggestion && (
          <div className="w-[120px] flex justify-center">
            <Button
              variant={"textIcon"}
              onClick={handleOpenSuggestionModal}
              className="[&_svg]:size-6 h-fit w-14"
            >
              <Bot />
              <span className="text-xs font-medium leading-none">AI</span>
            </Button>
          </div>
        )}
      </div>
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

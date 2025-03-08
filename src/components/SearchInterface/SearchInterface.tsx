import { FC, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Event } from "../../types/event";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionDialog";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";
import MovieSuggestionDialog from "../MovieSuggestion/MovieSuggestionDialog";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";

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
    !movieSuggestion && toast.info("Out of suggestions for this event!");
  };

  const { movieSuggestion, isLoading, mutate } = useFetchMovieEventSuggestions(
    event.id
  );

  return (
    <div className={"flex flex-row grow align-items justify-center gap-2 px-2"}>
      <div className="flex grow justify-center">
        <SearchBar event={event} />
      </div>
      <div className="flex justify-center align-items sm:w-[120px]">
        <div className="w-[120px] flex justify-center">
          <Button
            variant={"textIcon"}
            onClick={handleOpenSuggestionModal}
            disabled={isLoading || !movieSuggestion}
            className="[&_svg]:size-6 h-fit w-14"
          >
            <Bot />
            <span className="text-xs font-medium leading-none">AI</span>
          </Button>
        </div>
      </div>
      {/* {movieSuggestion && (
        <Dialog
          open={showMovieSuggestionModal}
          onOpenChange={handleCloseSuggestionModal}
        >
          <MovieSuggestionDialog
            handleCloseSuggestionModal={handleCloseSuggestionModal}
            movieSuggestion={movieSuggestion}
            eventId={event.id}
            mutate={mutate}
          ></MovieSuggestionDialog>
        </Dialog>
      )} */}
    </div>
  );
};

export default SearchInterface;

import { FC, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Event } from "../../types/event";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionDialog";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";
import MovieSuggestionDialog from "../MovieSuggestion/MovieSuggestionDialog";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";
import { addSuggestedMovie, declineSuggestedMovie } from "@/api/movies/Movies";
import { MovieSuggestion } from "@/types/movie";

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

  const { movieSuggestion, isLoading, mutate } = useFetchMovieEventSuggestions(
    event.id
  );

  const handleSuggestionAction = async (
    movieSuggestion: MovieSuggestion,
    action: "accept" | "decline"
  ) => {
    action === "accept"
      ? await addSuggestedMovie(movieSuggestion)
      : await declineSuggestedMovie(movieSuggestion);
    mutate();
  };

  useEffect(() => {
    if (!movieSuggestion && !isLoading && showMovieSuggestionModal) {
      toast.info("Out of suggestions for this event");
      setShowMovieSuggestionModal(false);
    }
  }, [movieSuggestion]);

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
      <Dialog
        open={showMovieSuggestionModal}
        onOpenChange={handleCloseSuggestionModal}
      >
        {movieSuggestion && (
          <MovieSuggestionDialog
            movieSuggestion={movieSuggestion}
            eventId={event.id}
            handleSuggestionAction={handleSuggestionAction}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SearchInterface;

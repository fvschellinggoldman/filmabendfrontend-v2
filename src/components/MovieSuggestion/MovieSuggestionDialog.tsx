import { FC } from "react";
import {
  addSuggestedMovie,
  declineSuggestedMovie,
} from "../../api/movies/Movies";
import MovieSuggestionElement from "./MovieSuggestionElement";
import { MovieSuggestion } from "@/types/movie";
import { DialogContent } from "../ui/dialog";

interface MovieSuggestionDialogProps {
  handleCloseSuggestionModal: () => void;
  movieSuggestion: MovieSuggestion;
  eventId: number;
  mutate: () => void;
}

const MovieSuggestionDialog: FC<MovieSuggestionDialogProps> = ({
  movieSuggestion,
  mutate,
}) => {
  const handleSuggestionAction = (
    movieSuggestion: MovieSuggestion,
    action: "accept" | "decline"
  ) => {
    action === "accept"
      ? addSuggestedMovie(movieSuggestion)
      : declineSuggestedMovie(movieSuggestion);
    mutate();
  };

  return (
    <DialogContent className="rounded-md w-fit pb-4">
      <div className={"flex flex-col text-center justify-center items-center"}>
        <MovieSuggestionElement
          movieSuggestion={movieSuggestion}
          handleSuggestionAction={handleSuggestionAction}
        />
      </div>
    </DialogContent>
  );
};

export default MovieSuggestionDialog;

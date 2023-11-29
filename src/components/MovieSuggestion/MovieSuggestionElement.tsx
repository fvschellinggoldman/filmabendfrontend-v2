import React, { FC } from "react";
import styles from "./MovieSuggestion.module.scss";
import { MovieSuggestion } from "../../types/movie";
import { useSwipeable } from "react-swipeable";
import { addSuggestedMovie } from "../../api/movies/Movies";

interface MovieSuggestionElementProps {
  movieSuggestion: MovieSuggestion;
  setShowSuggestionModel: (show: boolean) => void;
}

const MovieSuggestionElement: FC<MovieSuggestionElementProps> = ({
  movieSuggestion,
  setShowSuggestionModel,
}) => {
  const approveSuggestion = () => {
    addSuggestedMovie(movieSuggestion);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("User Swiped Left!"),
    onSwipedRight: () => console.log("User Swiped Right!"),
    onSwipedDown: () => setShowSuggestionModel(false),
  });

  return (
    <div {...handlers} className={styles.MovieSuggestionElement}>
      <img
        src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterData.filepath}`}
      ></img>
      <div>{movieSuggestion.title}</div>
    </div>
  );
};

export default MovieSuggestion;

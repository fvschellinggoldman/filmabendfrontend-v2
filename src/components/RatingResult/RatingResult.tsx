import React, { FC } from "react";
import { Movie } from "../../types/movie";
import { RatingStatus } from "../../types/rating";
import styles from "./RatingResult.module.scss";

interface RatingResultProps {
  movie: Movie;
  ratingStatus: RatingStatus;
}

const RatingResult: FC<RatingResultProps> = ({ movie, ratingStatus }) => {
  return (
    <div className={styles.RatingResult}>
      <p>
        {" "}
        Overall rating for {movie.name} is {movie.averageRating}
      </p>
      {ratingStatus.breakdown.map((ratingResult) => (
        <p>
          {" "}
          {ratingResult.displayName} : {ratingResult.rating}{" "}
        </p>
      ))}
    </div>
  );
};

export default RatingResult;

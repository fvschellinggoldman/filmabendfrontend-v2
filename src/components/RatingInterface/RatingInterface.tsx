import React, { FC } from "react";
import { useFetchRatingStatus } from "../../api/movies/RatingQueue";
import { Movie } from "../../types/movie";
import { RatingState } from "../../types/rating";
import RatingElement from "../RatingElement/RatingElement";
import RatingResult from "../RatingResult/RatingResult";

interface RatingInterfaceProps {
  movie: Movie;
  isUserAdmin: boolean;
}

const RatingInterface: FC<RatingInterfaceProps> = ({ movie, isUserAdmin }) => {
  const { ratingStatus } = useFetchRatingStatus(movie.id);

  if (!ratingStatus) {
    return <></>;
  }

  return (
    <>
      {ratingStatus.state === RatingState.OPEN ? (
        <RatingElement
          movie={movie}
          ratingStatus={ratingStatus}
          isUserAdmin={isUserAdmin}
        />
      ) : (
        <RatingResult movie={movie} ratingStatus={ratingStatus} />
      )}
    </>
  );
};

export default RatingInterface;

import { FC } from "react";
import { useFetchRatingStatus } from "../../api/movies/RatingQueue";
import { Movie } from "../../types/movie";
import { RatingState } from "../../types/rating";
import { User } from "../../types/user";
import RatingElement from "../RatingElement/RatingElement";
import RatingResult from "../RatingResult/RatingResult";

interface RatingInterfaceProps {
  movie: Movie;
  user: User;
}

const RatingInterface: FC<RatingInterfaceProps> = ({ movie, user }) => {
  const { ratingStatus } = useFetchRatingStatus(movie.id);

  if (!ratingStatus) {
    return <></>;
  }

  return (
    <>
      {ratingStatus.state === RatingState.OPEN ? (
        <RatingElement movie={movie} ratingStatus={ratingStatus} user={user} />
      ) : (
        <RatingResult movie={movie} ratingStatus={ratingStatus} />
      )}
    </>
  );
};

export default RatingInterface;

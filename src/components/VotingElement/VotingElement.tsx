import { FC, useState } from "react";
import VotingMovieDetails from "../VotingMovieDetails/VotingMovieDetails";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";
import RatingInterface from "../RatingInterface/RatingInterface";
import { toast } from "sonner";
import { User } from "../../types/user";
import VotedRibbon from "./VotedRibbon";

function getContrastTextColor(rgbColor?: number[]) {
  // If backgroundColor is undefined, provide a default value (e.g., white)
  if (!rgbColor) {
    return "#FFFFFF"; // Default to white
  }

  // Destructure RGB values
  const [r, g, b] = rgbColor;

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose white or black as the text color based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

interface VotingElementProps {
  movie: Movie;
  eventClosed: boolean;
  user: User;
}

const VotingElement: FC<VotingElementProps> = ({
  movie,
  eventClosed,
  user,
}) => {
  const [selected, setSelected] = useState(
    eventClosed ? false : movie.votedForByCurrentUser
  );
  const bg = movie.moviePosterData.averageImageColors
    ? movie.moviePosterData.averageImageColors.join(",")
    : ["255,255,255"];
  const textColor = getContrastTextColor(
    movie.moviePosterData.averageImageColors
  );
  const recentlyRated =
    movie.ratingClosedOn &&
    new Date().getTime() - new Date(movie.ratingClosedOn).getTime() <=
      24 * 60 * 60 * 1000;

  const handleClick = () => {
    setSelected(!selected);
    selected
      ? toast.success(`You have removed your vote for ${movie.name}!`)
      : toast.success(`You have added your vote for ${movie.name}!`);
    postRequest(`/api/movie/${movie.id}/modify_voting_state`, {
      vote: !selected,
    });
  };

  return (
    <div className="w-full perspective-1000 flex items-center justify-center flex-row h-full relative group">
      <div
        className="sm:group-hover:rotate-y-180 transition-all duration-500 flex"
        style={{ transformStyle: "preserve-3d" }}
      >
        {(selected || eventClosed) && (
          <VotedRibbon
            eventClosed={eventClosed}
            votesAmount={movie.votes.length}
          />
        )}

        <img
          className={`w-3/5 sm:w-full h-auto ${selected ? "opacity-30" : ""} `}
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
          alt="Movie poster"
          loading="lazy"
          onClick={eventClosed ? () => {} : handleClick}
        ></img>
        <div
          className={`hidden sm:block ${
            selected ? "opacity-30" : ""
          } absolute px-4 py-2 bottom-0 flex justify-center align-items grow w-full text-md bg-black/50 truncate text-white`}
        >
          {movie.name}
        </div>
        <div
          style={{
            backgroundColor: `rgb(${bg})`,
            color: textColor,
            transformStyle: "preserve-3d",
          }}
          className={
            "w-2/5 sm:w-full top-0 left-0 flex justify-center items-center sm:absolute sm:h-full sm:rotate-y-180 transition-all duration-500 backface-hidden grow"
          }
        >
          {movie.rateable || recentlyRated ? (
            <RatingInterface movie={movie} user={user} />
          ) : (
            <VotingMovieDetails
              movie={movie}
              handleClick={handleClick}
              selected={selected}
              eventClosed={eventClosed}
              user={user}
            ></VotingMovieDetails>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingElement;

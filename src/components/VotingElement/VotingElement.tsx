import { ImageListItem, ImageListItemBar } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./VotingElement.module.scss";
import VotingMovieDetails from "../VotingMovieDetails/VotingMovieDetails";
import cn from "classnames";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";
import RatingInterface from "../RatingInterface/RatingInterface";
import { toast } from "sonner";
import { User } from "../../types/user";

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
    <div className={styles.VotingElementWrapper}>
      <ImageListItem
        sx={{ flexDirection: "row", width: "100%", height: "100% !important" }}
      >
        <div className={styles.ImageContainer}>
          <div className={styles.Ribbon}>
            {selected && !eventClosed && (
              <span className={styles.SpanBox}>Voted</span>
            )}
            {eventClosed && (
              <span className={styles.SpanBox}>
                Votes: {movie.votes.length.toString()}
              </span>
            )}
          </div>
          <img
            className={cn(styles.elementImage, { [styles.selected]: selected })}
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
            alt="Movie poster"
            loading="lazy"
            onClick={eventClosed ? () => {} : handleClick}
          ></img>
          <div
            className={cn(styles.ItemBarContainer, {
              [styles.selected]: selected,
            })}
          >
            <ImageListItemBar title={movie.name} />
          </div>
          <div
            style={{
              backgroundColor: `rgb(${bg})`,
              color: textColor,
            }}
            className={styles.VotingMovieDetails}
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
      </ImageListItem>
    </div>
  );
};

export default VotingElement;

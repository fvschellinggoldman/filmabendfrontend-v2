import { ImageListItem, ImageListItemBar } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./VotingElement.module.scss";
import VotingMovieDetails from "../VotingMovieDetails/VotingMovieDetails";
import cn from "classnames";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";

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
}

const VotingElement: FC<VotingElementProps> = ({ movie }) => {
  const [selected, setSelected] = useState(movie.votedForByCurrentUser);
  const bg = movie.moviePosterData.averageImageColors
    ? movie.moviePosterData.averageImageColors.join(",")
    : ["255,255,255"];
  const textColor = getContrastTextColor(
    movie.moviePosterData.averageImageColors
  );

  const handleClick = async () => {
    setSelected(!selected);
    await postRequest(`/api/movie/${movie.id}/modify_voting_state`, {
      vote: !selected,
    });
  };

  return (
    <div
      className={cn(styles.VotingElementWrapper, {
        [styles.selected]: selected,
      })}
      onClick={handleClick}
    >
      <ImageListItem sx={{ flexDirection: "row" }}>
        <div className={styles.ImageContainer}>
          <img
            className={styles.image}
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
            alt="Movie poster"
            loading="lazy"
          ></img>
          <div className={styles.ItemBarContainer}>
            <ImageListItemBar title={movie.name} />
          </div>
          <div
            style={{
              backgroundColor: `rgb(${bg})`,
              color: textColor,
            }}
            className={styles.VotingMovieDetails}
          >
            <VotingMovieDetails movie={movie}></VotingMovieDetails>
          </div>
        </div>
      </ImageListItem>
    </div>
  );
};

export default VotingElement;

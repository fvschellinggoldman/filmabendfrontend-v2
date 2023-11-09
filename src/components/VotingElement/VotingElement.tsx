import { ImageListItem, ImageListItemBar } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./VotingElement.module.scss";
import VotingMovieDetails from "../VotingMovieDetails/VotingMovieDetails";
import cn from "classnames";
import { Movie } from "../../types/movie";

interface VotingElementProps {
  movie: Movie;
}

const VotingElement: FC<VotingElementProps> = ({ movie }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
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
            src={movie.posterPath}
            alt="Movie poster"
            loading="lazy"
          ></img>
          <div className={styles.ItemBarContainer}>
            <ImageListItemBar title={movie.name} />
          </div>
          <div className={styles.VotingMovieDetails}>
            <VotingMovieDetails movie={movie}></VotingMovieDetails>
          </div>
        </div>
      </ImageListItem>
    </div>
  );
};

export default VotingElement;

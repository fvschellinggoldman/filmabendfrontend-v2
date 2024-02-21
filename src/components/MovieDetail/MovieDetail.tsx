import React from "react";
import { useParams } from "react-router-dom";
import { useFetchMovie } from "../../api/movies/Movies";
import styles from "./MovieDetail.module.scss";
import MovieDetailData from "./MovieDetailData";

export const MovieDetail = () => {
  const { slug } = useParams();
  const movieId =
    slug !== undefined && !isNaN(parseInt(slug)) ? parseInt(slug) : 1190;

  const { movie } = useFetchMovie(movieId);

  if (!movie) {
    return null;
  }

  return (
    <div className={styles.MovieDetailContainer}>
      <div className={styles.ImageContainer}>
        <img
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
          width="90%"
          height="90%"
          alt="Movie Poster"
        ></img>
      </div>
      <MovieDetailData movie={movie}></MovieDetailData>
    </div>
  );
};

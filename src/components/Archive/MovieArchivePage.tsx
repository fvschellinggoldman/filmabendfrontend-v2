import { ImageListItem, ImageListItemBar } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchWatchedMovies } from "../../api/movies/WatchedMovies";
import styles from "./MovieArchivePage.module.scss";

interface MovieArchivePageProps {
  index: number;
  hidden: boolean;
}

const MovieArchivePage: FC<MovieArchivePageProps> = ({ index, hidden }) => {
  const { movies } = useFetchWatchedMovies(index);
  const navigate = useNavigate();

  if (movies === undefined || hidden === true) {
    return null;
  }

  return (
    <>
      {movies.map((movie) => (
        <ImageListItem key={movie.id} className={styles.ClickableImageList}>
          <img
            onClick={() => navigate(`/movie/${movie.id}`)}
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
            alt="Movie poster"
            loading="lazy"
          />
          <ImageListItemBar title={movie.name} />
        </ImageListItem>
      ))}
    </>
  );
};

export default MovieArchivePage;

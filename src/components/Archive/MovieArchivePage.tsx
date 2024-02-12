import { ImageListItem, ImageListItemBar } from "@mui/material";
import { FC } from "react";
import { useFetchWatchedMovies } from "../../api/movies/WatchedMovies";

interface MovieArchivePageProps {
  index: number;
  hidden: boolean;
}

const MovieArchivePage: FC<MovieArchivePageProps> = ({ index, hidden }) => {
  const { movies } = useFetchWatchedMovies(index);

  if (movies === undefined || hidden === true) {
    return null;
  }
  return (
    <>
      {movies.map((movie) => (
        <ImageListItem>
          <img
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

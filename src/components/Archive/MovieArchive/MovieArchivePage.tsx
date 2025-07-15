import { useFetchWatchedMovies } from "@/api/movies/WatchedMovies";
import { MovieFilter } from "@/types/movie";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface MovieArchivePageProps {
  index: number;
  hidden: boolean;
  selectedFilter?: MovieFilter;
}

const MovieArchivePage: FC<MovieArchivePageProps> = ({ index, hidden, selectedFilter }) => {
  const { movies } = useFetchWatchedMovies(index, selectedFilter);
  const navigate = useNavigate();

  if (movies === undefined || hidden === true) {
    return null;
  }

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="hover:cursor-pointer relative">
          <img
            onClick={() => navigate(`/movie/${movie.id}`)}
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
            alt="Movie poster"
            loading="lazy"
            className="rounded-lg w-full h-full"
          />
          <div
            className={`absolute w-full py-2 bottom-0 flex justify-center align-items text-md bg-black/50 truncate text-white rounded-lg`}
          >
            {movie.name}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieArchivePage;

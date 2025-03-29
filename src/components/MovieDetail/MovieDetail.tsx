import { useParams } from "react-router-dom";
import { useFetchMovie } from "../../api/movies/Movies";
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
    <div className={"flex flex-col sm:flex-row px-5 gap-4"}>
      <div
        className={
          "flex flex-col w-full sm:w-1/2 h-fit items-center justify-center mt-4"
        }
      >
        <img
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
          alt="Movie Poster"
          className="rounded-lg max-w-[50vh]"
        ></img>
      </div>
      <MovieDetailData movie={movie}></MovieDetailData>
    </div>
  );
};

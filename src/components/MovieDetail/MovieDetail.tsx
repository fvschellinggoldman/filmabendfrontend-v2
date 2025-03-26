import { useParams } from "react-router-dom";
import { useFetchMovie } from "../../api/movies/Movies";
import MovieDetailData from "./MovieDetailDataV2";

export const MovieDetail = () => {
  const { slug } = useParams();
  const movieId =
    slug !== undefined && !isNaN(parseInt(slug)) ? parseInt(slug) : 1190;

  const { movie } = useFetchMovie(movieId);

  if (!movie) {
    return null;
  }

  return (
    <div className={"flex flex-col sm:flex-row px-5"}>
      <div
        className={
          "flex flex-col w-full sm:w-3/4 h-fit items-center justify-center my-4"
        }
      >
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

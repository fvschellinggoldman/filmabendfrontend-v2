import { FC } from "react";
import { MovieDetail } from "../../types/movie";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import MovieSummaryCard from "./MovieSummaryCard";
import AudienceScoreCard from "./AudienceScoreCard";
import KeyFactsCard from "./KeyFactsCard";

interface MovieDetailDataProps {
  movie: MovieDetail;
}

const MovieDetailData: FC<MovieDetailDataProps> = ({ movie }) => {
  return (
    <div className="w-full sm:w-1/2 pt-4 flex flex-col gap-4 pb-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full items-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text">
          {movie.name}
        </h1>
        <div className="flex flex-row gap-2 justify-center">
          {movie.genres.map((genre) => {
            return (
              <Badge className="bg-primary rounded-full h-6"> {genre} </Badge>
            );
          })}
        </div>
      </div>
      <Separator />
      <KeyFactsCard movie={movie} />
      <AudienceScoreCard movie={movie} />
      <MovieSummaryCard description={movie.description} />
    </div>
  );
};

export default MovieDetailData;

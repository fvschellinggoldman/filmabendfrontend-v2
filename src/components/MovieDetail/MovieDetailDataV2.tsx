import { FC, useState } from "react";
import { MovieDetail } from "../../types/movie";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Eye, EyeClosed, Star } from "lucide-react";

interface MovieDetailDataProps {
  movie: MovieDetail;
}

const MovieDetailData: FC<MovieDetailDataProps> = ({ movie }) => {
  const [showImdbRating, setShowImdbRating] = useState(false);
  const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);

  return (
    <div className="w-full pt-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text">
          {movie.name}
        </h1>
        <div className="flex flex-row gap-2">
          {movie.genres.map((genre) => {
            return (
              <Badge className="bg-secondary rounded-full"> {genre} </Badge>
            );
          })}
        </div>
      </div>
      <Separator />
      <Card> key summary</Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-left">
            <div className="flex justify-between items-center">
              Audience Scores
              <Button
                variant={"ghost"}
                className={`${movie.averageRating ? "hidden" : ""}`}
                onClick={() => setShowImdbRating(!showImdbRating)}
              >
                {showImdbRating || movie.averageRating ? (
                  <EyeClosed />
                ) : (
                  <Eye />
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          {showImdbRating || movie.averageRating ? (
            <>
              <div className="flex flex-row items-center gap-2 w-full justify-between">
                <div className="w-full justify-center flex">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-yellow-500">
                    <span className="text-2xl font-bold">
                      {movie.averageRating?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-20 w-0.5" />
                <div className="w-full flex justify-center">
                  <div className="flex flex-row gap-1">
                    IMDb:
                    <Star fill="#eab308" />
                    {movie.imdbRating} / 10
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-1 pb-0">
                <Button
                  variant={"ghost"}
                  onClick={() => setShowRatingBreakdown(!showRatingBreakdown)}
                >
                  {showRatingBreakdown ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              {showRatingBreakdown && (
                <div className="flex flex-col">
                  {movie.breakdown?.map(({ displayName, rating }) => {
                    return (
                      <div>
                        {displayName} : {rating}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row">{movie.description}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetailData;

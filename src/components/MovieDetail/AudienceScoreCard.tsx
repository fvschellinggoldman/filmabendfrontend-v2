import { Star, EyeClosed, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { MovieDetail } from "@/types/movie";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useMemo } from "react";
import NeonText from "../Typography/NeonText";

interface AudienceScoreCardProps {
  movie: MovieDetail;
}

const AudienceScoreCard = ({ movie }: AudienceScoreCardProps) => {
  const [showImdbRating, setShowImdbRating] = useState(false);
  const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);

  const sortedBreakdown = useMemo(() => {
    return movie.breakdown?.slice().sort((a, b) => b.rating - a.rating);
  }, [movie.breakdown]);

  return (
    <Card className="bg-secondary text-white">
      <CardHeader>
        <CardTitle className="text-left">
          <div className="flex justify-between items-center">
            {movie.averageRating ? "Audience Scores" : "IMDb Rating"}
            <div className="flex flex-row items-center justify-center gap-1">
              {showImdbRating && (
                <div className="flex flex-row items-center gap-2 w-full justify-between">
                  <div className="w-full flex justify-center">
                    <div className="flex flex-row gap-1 items-center">
                      <Star fill="#eab308" />
                      {movie.imdbRating} / 10
                    </div>
                  </div>
                </div>
              )}
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {movie.averageRating ? (
          <>
            <div className="flex flex-row items-center gap-2 w-full justify-between">
              <div className="w-full justify-center flex flex-col sm:flex-row gap-2 sm:gap-6 items-center pb-2">
                <NeonText text="Filmabend" size={4} />
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-yellow-500 text-black">
                  <span className="text-2xl font-bold">
                    {movie.averageRating?.toFixed(1)}
                  </span>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-28 sm:h-20 w-0.5"
              />
              <div className="w-full flex justify-center">
                <div className="flex flex-col sm:flex-row gap-1">
                  IMDb:
                  <div className="flex flex-row gap-2">
                    <Star fill="#eab308" />
                    {movie.imdbRating} / 10
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-1 pb-0">
              <Button
                variant={"ghost"}
                onClick={() => setShowRatingBreakdown(!showRatingBreakdown)}
                className="flex flex-row"
              >
                {showRatingBreakdown ? "Hide" : "Show"} Details
                {showRatingBreakdown ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {showRatingBreakdown && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                {sortedBreakdown?.map(({ displayName, rating }) => {
                  return (
                    <Card className="bg-slate-200 text-black">
                      <CardHeader>
                        <CardTitle className="text-left">
                          {displayName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-row gap-1">
                            {Array.from({ length: 10 }, (_, index) => (
                              <Star
                                key={index}
                                fill={index < rating ? "#eab308" : "#cbd5e1"}
                              />
                            ))}
                          </div>
                          {rating} / 10
                        </div>
                      </CardContent>
                    </Card>
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
  );
};
export default AudienceScoreCard;

import { Clock, Calendar, Tag, Library } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import KeyMovieData from "./KeyMovieData";
import { MovieDetail } from "@/types/movie";

interface KeyFactsCardProps {
  movie: MovieDetail;
}

const KeyFactsCard = ({ movie }: KeyFactsCardProps) => {
  return (
    <Card className="bg-secondary text-white">
      <CardHeader>
        <CardTitle className="text-left">Key Facts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <KeyMovieData
          icon={<Clock size={18} />}
          iconLabel="Runtime"
          value={`${movie.runtime} minutes`}
        />
        <KeyMovieData
          icon={<Calendar size={18} />}
          iconLabel="Released"
          value={movie.releaseDate.toString()}
        />
        <KeyMovieData
          icon={<Tag size={18} />}
          iconLabel="Season"
          value={movie.season.toString()}
        />
        <KeyMovieData
          icon={<Library size={18} />}
          iconLabel="Category"
          value={movie.categoryName || ""}
        />
      </CardContent>
    </Card>
  );
};
export default KeyFactsCard;

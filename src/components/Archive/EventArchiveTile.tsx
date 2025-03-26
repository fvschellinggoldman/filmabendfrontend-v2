import { FC } from "react";
import { Event } from "../../types/event";
import { useNavigate } from "react-router-dom";
import { Large } from "shadcn-typography";

interface EventArchiveTileProps {
  event: Event;
  index: number;
}

export const EventArchiveTile: FC<EventArchiveTileProps> = ({
  event,
  index,
}) => {
  const navigate = useNavigate();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div
      className={`rounded-md flex flex-col ${
        index % 2 ? "bg-secondary text-white" : "bg-primary"
      }`}
    >
      <Large> {event.name} </Large>
      <div className="grid grid-cols-1 sm:grid-cols-3 p-2">
        {event.movies.map((movie) => (
          <div
            key={movie.name}
            className={"pr-1 hover:cursor-pointer flex flex-row"}
          >
            <div className="grid grid-cols-4">
              <img
                onClick={() => navigate(`/movie/${movie.id}`)}
                src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
                alt="Movie poster"
                loading="lazy"
                height={100}
                className={"rounded-md"}
              />
              <div className="flex flex-col items-start justify-center col-span-3 px-2">
                <p>{movie.name}</p>
                <p>{movie.averageRating}</p>
                <p className="italic text-xs leading-6">
                  {movie.ratingClosedOn ? formatDate(movie.ratingClosedOn) : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

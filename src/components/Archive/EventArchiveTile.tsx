import { FC } from "react";
import { Event } from "../../types/event";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

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
    <Card
      sx={{
        marginBottom: "2rem",
        backgroundColor: index % 2 === 0 ? "#A9D6E5" : "#2C7DA0",
      }}
    >
      <CardHeader title={event.name}></CardHeader>
      <CardContent key="Watched movies">
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="left"
          flexGrow="true"
        >
          {event.movies.map((movie) => (
            <Stack
              direction="row"
              key={movie.name}
              className={"pr-1 hover:cursor-pointer"}
            >
              <img
                onClick={() => navigate(`/movie/${movie.id}`)}
                src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
                alt="Movie poster"
                loading="lazy"
                height={100}
              />
              <Stack justifyContent="center">
                <Typography>{movie.name}</Typography>
                <Typography>{movie.averageRating}</Typography>
                <Typography variant="subtitle2">
                  {movie.ratingClosedOn ? formatDate(movie.ratingClosedOn) : ""}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

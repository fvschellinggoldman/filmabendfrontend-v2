import React, { FC } from "react";
import { Event } from "../../types/event";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./EventArchiveTile.module.scss";
import { useNavigate } from "react-router-dom";

interface EventArchiveTileProps {
  event: Event;
}

export const EventArchiveTile: FC<EventArchiveTileProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title={event.name}></CardHeader>
      <CardContent key="Watched movies">
        <Stack direction="row" justifyContent="space-between" flexGrow="true">
          {event.movies.map((movie) => (
            <Stack direction="row" key={movie.id}>
              <img
                className={styles.movieImage}
                onClick={() => navigate(`/movie/${movie.id}`)}
                src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movie.moviePosterData.filepath}`}
                alt="Movie poster"
                loading="lazy"
                height={100}
              />
              <Stack justifyContent="center">
                <Typography>{movie.name}</Typography>
                <Typography>{movie.averageRating}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

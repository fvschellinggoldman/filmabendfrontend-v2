import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { FC } from "react";
import styles from "./VotingMovieDetails.module.scss";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InfoIcon from "@mui/icons-material/Info";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";
import cn from "classnames";
import Button from "@mui/material/Button";

interface VotingMovieDetailsProps {
  movie: Movie;
  handleClick: () => void;
  selected: boolean;
  eventClosed: boolean;
}

const VotingMovieDetails: FC<VotingMovieDetailsProps> = ({
  movie,
  handleClick,
  selected,
  eventClosed,
}) => {
  const handleRatingChange = async () => {
    const ratingState = movie.rateable ? "closed" : "opened";
    toast.success(`${movie.name} has been ${ratingState} for rating!`);
    await postRequest(`/api/movie/${movie.id}/modify_rating_state`, {
      rateable: movie.rateable,
    });
    mutate("/api/event");
  };

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={styles.inheritColor}>{movie.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={cn(styles.cursiveFont, styles.inheritColor)}>
              {movie.genres.join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Toolbar className={styles.OverlayToolbar}>
        {movie.rateable ? (
          <Tooltip title="Lock Rating">
            <IconButton
              onClick={handleRatingChange}
              color="inherit"
              aria-label="lock rating"
            >
              <LockIcon></LockIcon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Unlock Rating">
            <IconButton
              onClick={handleRatingChange}
              color="inherit"
              aria-label="unlock rating"
            >
              <LockOpenIcon></LockOpenIcon>
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="More Information">
          <IconButton color="inherit" aria-label="close voting">
            <InfoIcon></InfoIcon>
          </IconButton>
        </Tooltip>
      </Toolbar>
      {selected ? (
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={eventClosed}
        >
          Remove Vote
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={eventClosed}
        >
          Add Vote
        </Button>
      )}
    </div>
  );
};

export default VotingMovieDetails;

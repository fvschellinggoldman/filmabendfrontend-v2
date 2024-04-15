import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./VotingMovieDetails.module.scss";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InfoIcon from "@mui/icons-material/Info";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";
import cn from "classnames";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Action } from "../../types/action";
import { User } from "../../types/user";

interface VotingMovieDetailsProps {
  movie: Movie;
  handleClick: () => void;
  selected: boolean;
  eventClosed: boolean;
  user: User;
}

const VotingMovieDetails: FC<VotingMovieDetailsProps> = ({
  movie,
  handleClick,
  selected,
  eventClosed,
  user,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleRatingChange = async () => {
    toast.success(`${movie.name} has been opened for rating!`);
    await postRequest(`/api/movie/${movie.id}/modify_rating_state`, {
      newRateableState: true,
    });
    mutate("/api/event");
  };

  const handleRatingChangeClick = () => {
    user.userPreference && user.userPreference.safeMode
      ? setShowConfirmationModal(true)
      : handleRatingChange();
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div>
      {showConfirmationModal && (
        <ConfirmationModal
          open={true}
          action={Action.enableRating}
          descriptionText={`This will open the movie ${movie.name} for rating.`}
          setModalState={setShowConfirmationModal}
          confirmationFunction={handleRatingChange}
        />
      )}
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
        {eventClosed && (
          <Tooltip title="Unlock Rating">
            <IconButton
              onClick={handleRatingChangeClick}
              color="inherit"
              aria-label="unlock rating"
            >
              <LockOpenIcon></LockOpenIcon>
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="More Information">
          <IconButton
            onClick={handleNavigate}
            color="inherit"
            aria-label="get movie details"
          >
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

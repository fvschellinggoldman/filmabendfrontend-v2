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

interface VotingMovieDetailsProps {
  movie: Movie;
}

const VotingMovieDetails: FC<VotingMovieDetailsProps> = ({ movie }) => {
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Name:</TableCell>
            <TableCell>{movie.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Toolbar className={styles.OverlayToolbar}>
        {movie.ratingLocked ? (
          <Tooltip title="Unlock Rating">
            <IconButton color="inherit" aria-label="unlock rating">
              <LockOpenIcon></LockOpenIcon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Lock Rating">
            <IconButton color="inherit" aria-label="lock rating">
              <LockIcon></LockIcon>
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="More Information">
          <IconButton color="inherit" aria-label="close voting">
            <InfoIcon></InfoIcon>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </div>
  );
};

export default VotingMovieDetails;

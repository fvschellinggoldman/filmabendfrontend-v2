import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MovieDetail } from "../../types/movie";
import styles from "./MovieDetailData.module.scss";
import { Box, Button, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface MovieDetailDataProps {
  movie: MovieDetail;
}

const MovieDetailData: FC<MovieDetailDataProps> = ({ movie }) => {
  const [showImdbRating, setShowImdbRating] = useState(false);
  const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);

  return (
    <TableContainer component={Paper} className={styles.MuiTableContainer}>
      <Table className={styles.table}>
        <TableBody>
          <TableRow key="movieId" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Name</TableCell>
            <TableCell>{movie.name}</TableCell>
          </TableRow>
          <TableRow key="description" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Description</TableCell>
            <TableCell>
              {movie.description ? movie.description : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="runtime" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Runtime</TableCell>
            <TableCell>
              {movie.runtime ? movie.runtime + " minutes" : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="releaseDate" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Release Date</TableCell>
            <TableCell>
              {movie.runtime ? movie.runtime + " minutes" : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="genres" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Genres</TableCell>
            <TableCell>
              {movie.genres.join(", ") ? movie.genres.join(", ") : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="season" className={styles.stripedRow}>
            <TableCell></TableCell>
            <TableCell className={styles.boldCell}>Season</TableCell>
            <TableCell>{movie.season}</TableCell>
          </TableRow>
          {movie.eventName && (
            <TableRow key="event" className={styles.stripedRow}>
              <TableCell></TableCell>
              <TableCell className={styles.boldCell}>Event</TableCell>
              <TableCell>{movie.eventName}</TableCell>
            </TableRow>
          )}
          {movie.imdbRating && (
            <TableRow key="imdbRating" className={styles.stripedRow}>
              <TableCell></TableCell>
              <TableCell className={styles.boldCell}>Imdb Rating</TableCell>
              {showImdbRating ? (
                <TableCell>{movie.imdbRating}</TableCell>
              ) : (
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => setShowImdbRating(true)}
                  >
                    Show Imdb Rating
                  </Button>
                </TableCell>
              )}
            </TableRow>
          )}
          {movie.averageRating && movie.ratingBreakdown && (
            <>
              <TableRow key="average Rating" className={styles.stripedRow}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setShowRatingBreakdown(!showRatingBreakdown)}
                  >
                    {showRatingBreakdown ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className={styles.boldCell}>
                  Average Rating
                </TableCell>
                <TableCell>{movie.averageRating}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={2}
                >
                  <Collapse
                    in={showRatingBreakdown}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Breakdown
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableBody>
                          {movie.ratingBreakdown.map((rating) => (
                            <TableRow key={rating.displayName}>
                              <TableCell component="th" scope="row">
                                {rating.displayName}
                              </TableCell>
                              <TableCell align="right">
                                {rating.rating}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieDetailData;

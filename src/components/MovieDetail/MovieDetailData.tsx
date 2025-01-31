import { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MovieDetail } from "../../types/movie";
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
    <TableContainer component={Paper} className={"my-4 h-fit"}>
      <Table className={"w-full"}>
        <TableBody className={"odd:bg-slate-50"}>
          <TableRow key="movieId">
            <TableCell sx={{ width: "1rem" }}></TableCell>
            <TableCell className={"font-bold"}>Name</TableCell>
            <TableCell>{movie.name}</TableCell>
          </TableRow>
          <TableRow key="description">
            <TableCell></TableCell>
            <TableCell className={"font-bold"}>Description</TableCell>
            <TableCell>
              {movie.description ? movie.description : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="runtime">
            <TableCell></TableCell>
            <TableCell className={"font-bold"}>Runtime</TableCell>
            <TableCell>
              {movie.runtime ? movie.runtime + " minutes" : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="releaseDate">
            <TableCell></TableCell>
            <TableCell className={"font-bold"}>Release Date</TableCell>
            <TableCell>
              {movie.releaseDate ? movie.releaseDate.toString() : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="genres">
            <TableCell></TableCell>
            <TableCell className={"font-bold"}>Genres</TableCell>
            <TableCell>
              {movie.genres.join(", ") ? movie.genres.join(", ") : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="season">
            <TableCell></TableCell>
            <TableCell className={"font-bold"}>Season</TableCell>
            <TableCell>{movie.season}</TableCell>
          </TableRow>
          {movie.categoryName && (
            <TableRow key="event">
              <TableCell></TableCell>
              <TableCell className={"font-bold"}>Event</TableCell>
              <TableCell>{movie.categoryName}</TableCell>
            </TableRow>
          )}
          {movie.imdbRating && (
            <TableRow key="imdbRating">
              <TableCell></TableCell>
              <TableCell className={"font-bold"}>Imdb Rating</TableCell>
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
          {movie.averageRating && movie.breakdown && (
            <>
              <TableRow key="average Rating">
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
                <TableCell className={"font-bold"}>Average Rating</TableCell>
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
                          {movie.breakdown.map((rating) => (
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

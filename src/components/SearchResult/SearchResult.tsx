import { AddCircle } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC } from "react";
import { addMovie } from "../../api/movies/Movies";
import { MovieSearchResult } from "../../types/movie";
import styles from "./SearchResult.module.scss";

interface SearchResultProps {
  searchResult: MovieSearchResult;
  eventId: number;
}

const SearchResult: FC<SearchResultProps> = ({ searchResult, eventId }) => {
  const handleAddMovie = () => {
    addMovie(searchResult, eventId);
  };

  return (
    <div className={styles.SearchResult}>
      <ListItemButton>
        <ListItemText
          primary={searchResult.title}
          secondary={searchResult.releaseDate?.toString()}
        />
        <ListItemIcon
          onClick={handleAddMovie}
          style={{ justifyContent: "right" }}
        >
          <AddCircle style={{ fontSize: "36px" }} />
        </ListItemIcon>
      </ListItemButton>
    </div>
  );
};
export default SearchResult;

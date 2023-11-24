import { AddCircle } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC, useState } from "react";
import { addMovie } from "../../api/movies/Movies";
import { MovieSearchResult } from "../../types/movie";
import styles from "./SearchResult.module.scss";
import { toast } from "sonner";
import { Event } from "../../types/event";

interface SearchResultProps {
  searchResult: MovieSearchResult;
  event: Event;
}

const SearchResult: FC<SearchResultProps> = ({ searchResult, event }) => {
  const [searchResultAdded, setSearchResultAdded] = useState(
    event.movies.some((movie) => movie.tmdbId === searchResult.tmdbId)
  );

  const handleAddMovie = () => {
    toast.success(`${searchResult.title} has been added!`);
    setSearchResultAdded(true);
    addMovie(searchResult, event.id);
  };

  return (
    <div className={styles.SearchResult}>
      <ListItemButton disabled={searchResultAdded}>
        <ListItemText
          primary={searchResult.title}
          secondary={searchResult.releaseDate?.toString()}
        />
        {!searchResultAdded && (
          <ListItemIcon
            onClick={handleAddMovie}
            style={{ justifyContent: "right" }}
          >
            <AddCircle style={{ fontSize: "36px" }} />
          </ListItemIcon>
        )}
      </ListItemButton>
    </div>
  );
};
export default SearchResult;

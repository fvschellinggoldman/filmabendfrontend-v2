import { AddCircle } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC, useState } from "react";
import { addMovie } from "../../api/movies/Movies";
import { MovieSearchResult } from "../../types/movie";
import styles from "./SearchResult.module.scss";
import { toast } from "sonner";

interface SearchResultProps {
  searchResult: MovieSearchResult;
  eventId: number;
}

const SearchResult: FC<SearchResultProps> = ({ searchResult, eventId }) => {
  const [searchResultAdded, setSearchResultAdded] = useState(false);

  const handleAddMovie = () => {
    toast.success(`${searchResult.title} has been added!`);
    setSearchResultAdded(true);
    addMovie(searchResult, eventId);
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

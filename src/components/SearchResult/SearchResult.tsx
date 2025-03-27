import { FC, useState } from "react";
import { addSearchedMovie } from "../../api/movies/Movies";
import { MovieSearchResult } from "../../types/movie";
import { toast } from "sonner";
import { Event } from "../../types/event";
import { Large, Small } from "shadcn-typography";
import { CirclePlus } from "lucide-react";
import { mutate } from "swr";

interface SearchResultProps {
  result: MovieSearchResult;
  event: Event;
}

const SearchResult: FC<SearchResultProps> = ({ result, event }) => {
  const [searchResultAdded, setSearchResultAdded] = useState(
    event.movies.some((movie) => movie.tmdbId === result.tmdbId)
  );

  const canBeAdded = !searchResultAdded && result.addable;

  const handleAddMovie = () => {
    const { title } = result;
    toast.promise(addSearchedMovie(result, event.id), {
      loading: `Adding ${title} ...`,
      success: () => {
        return `${title} has been added!`;
      },
      error: `Error while adding ${title}`,
    });
    setSearchResultAdded(true);
    mutate("/api/event");
  };

  return (
    <li
      onClick={handleAddMovie}
      className={`px-4 py-2 flex flex-row items-center justify-between odd:bg-white even:bg-slate-100  ${
        canBeAdded
          ? "cursor-pointer hover:bg-accent"
          : "opacity-40 cursor-not-allowed"
      }`}
    >
      <div className="max-w-1/2 truncate">
        <Large className="truncate">{result.title}</Large>
        {result.releaseDate && <Small>{result.releaseDate.toString()}</Small>}
      </div>
      {canBeAdded && <CirclePlus className="min-w-6 min-h-6" />}
    </li>
  );
};
export default SearchResult;

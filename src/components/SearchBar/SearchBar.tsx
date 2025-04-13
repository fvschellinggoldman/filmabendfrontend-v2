import { FC, useState } from "react";
import { MovieSearchResult } from "../../types/movie";
import { getRequest } from "../../api/api";
import { useDebouncedCallback } from "use-debounce";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { LoaderCircle, Search } from "lucide-react";
import SearchResult from "../SearchResult/SearchResult";
import { Event } from "@/types/event";

interface SearchBarProps {
  event: Event;
}

const SearchBar = ({ event }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = async (value: string) => {
    if (!value) return;
    // search using input
    const searchResult: MovieSearchResult[] = await getRequest("/api/search", {
      search_string: value,
    });
    setOpen(true);
    setSearchResults(searchResult);
    setIsLoading(false);
  };

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 1000);

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setIsLoading(!!searchValue);
    debounced(searchValue);
  };

  return (
    <div className="relative max-w-96 grow flex items-center">
      <Popover open={open} onOpenChange={() => setOpen(false)}>
        <PopoverTrigger asChild>
          <div className="flex w-full items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
              {isLoading ? (
                <LoaderCircle className="text-gray-500 animate-spin h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </div>
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-14 border-[#ba8f9b]"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          {searchResults.length > 0 ? (
            <ul className="max-h-60 max-w-96 overflow-auto">
              {searchResults.map((result) => (
                <SearchResult
                  result={result}
                  event={event}
                  key={result.tmdbId}
                />
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center">No results found</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;

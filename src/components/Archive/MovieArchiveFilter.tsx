import { LoaderCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const MovieArchiveFilter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setIsLoading(!!searchValue);
    debounced(searchValue);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;
    // search using input
    console.log("test");
  };

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 1000);

  return (
    <div className="relative w-full px-2 mb-2">
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground ">
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
        className="pl-10 h-9 border-[#ba8f9b]"
      />
    </div>
  );
};

export default MovieArchiveFilter;

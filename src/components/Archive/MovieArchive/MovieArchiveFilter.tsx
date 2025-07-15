import { Filter, LoaderCircle, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Label } from "../../ui/label";
import { MovieFilter } from "@/types/movie";
import MovieArchiveSelect from "./MovieArchiveSelect";

const operators = [
  { label: "greater or equal (>=)", value: ">=" },
  { label: "is equal to (=)", value: "=" },
  { label: "less or equal (<=)", value: "<=" },
];

interface MovieArchiveFilterProps {
  selectedFilter?: MovieFilter;
  setSelectedFilter: (newFilter: MovieFilter) => void;
}

const MovieArchiveFilter = ({
  selectedFilter,
  setSelectedFilter,
}: MovieArchiveFilterProps) => {
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
    setSelectedFilter({
      ...selectedFilter,
      name: value,
    });
    setIsLoading(false);
  };

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 1000);

  const handleFilterUpdate = (filterUpdate: Partial<MovieFilter>) => {
    setSelectedFilter({
      ...selectedFilter,
      ...filterUpdate,
    });
  };

  useEffect(() => {
    if (!selectedFilter?.name) {
      setSearch("");
    }
  }, [selectedFilter]);

  return (
    <div className="flex flex-row gap-2 w-full max-w-4xl">
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Filter /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-background drop-shadow-2xl">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">
                Filter the archive.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label>Rating</Label>
                <MovieArchiveSelect
                  onValueChange={(value: string) =>
                    handleFilterUpdate({
                      rating: {
                        ratingValue: selectedFilter?.rating?.ratingValue || "5",
                        ratingOperator: value,
                      },
                    })
                  }
                  placeholder={selectedFilter?.rating?.ratingOperator || ">="}
                  itemSelectionArray={operators}
                />
                <MovieArchiveSelect
                  onValueChange={(value: string) =>
                    handleFilterUpdate({
                      rating: {
                        ratingValue: value,
                        ratingOperator:
                          selectedFilter?.rating?.ratingOperator || ">=",
                      },
                    })
                  }
                  placeholder={selectedFilter?.rating?.ratingValue || "5"}
                  itemSelectionArray={Array.from({ length: 10 }, (_, i) => ({
                    label: String(i + 1),
                    value: `${String(i + 1)}`,
                  }))}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label>Season</Label>
                <MovieArchiveSelect
                  onValueChange={(value: string) =>
                    handleFilterUpdate({
                      season: value,
                    })
                  }
                  placeholder={selectedFilter?.season || "6"}
                  itemSelectionArray={Array.from({ length: 6 }, (_, i) => ({
                    label: String(i + 1),
                    value: `${String(i + 1)}`,
                  }))}
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label>Genre</Label>

                <Button disabled variant={"outline"} className="col-span-2">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="relative w-full mb-2">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground ">
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
    </div>
  );
};

export default MovieArchiveFilter;

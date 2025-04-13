import MovieArchivePage from "./MovieArchivePage";
import { useState } from "react";
import { InfiniteLoader } from "../InfiniteLoader/InfiniteLoader";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

const ratings = [
  { label: "9+ (Outstanding)", value: "9" },
  { label: "8+ (Great)", value: "8" },
  { label: "7+ (Good)", value: "7" },
  { label: "6+ (Average)", value: "6" },
  { label: "Any Rating", value: "0" },
]

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedRating, setSelectedRating] = useState("0")

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<MovieArchivePage index={i} key={i} hidden={false} />);
    pages.push(
      <MovieArchivePage index={i + 1} key={`hidden_${i}`} hidden={true} />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-2 w-full px-2">
        {/* Rating Filter */}
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((rating) => (
              <SelectItem key={rating.value} value={rating.value}>
                {rating.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="rounded-lg w-fit" variant={"outline"}>
          Filter 1
        </Button>
        <Button className="rounded-lg w-fit" variant={"outline"}>
          Filter 2
        </Button>
        <Button className="rounded-lg w-fit" variant={"outline"}>
          Filter 3
        </Button>
        <Button className="rounded-lg w-fit" variant={"outline"}>
          Filter 4
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 px-2">{pages}</div>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </div>
  );
};

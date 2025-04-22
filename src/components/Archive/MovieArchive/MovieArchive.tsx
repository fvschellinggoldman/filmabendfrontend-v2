import { useState } from "react";
import { InfiniteLoader } from "../../InfiniteLoader/InfiniteLoader";
import MovieArchiveFilter from "./MovieArchiveFilter";
import { MovieFilter } from "@/types/movie";
import MovieArchivePage from "./MovieArchivePage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const [selectedFilter, setSelectedFilter] = useState<MovieFilter>();

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<MovieArchivePage index={i} key={i} hidden={false} />);
    pages.push(
      <MovieArchivePage index={i + 1} key={`hidden_${i}`} hidden={true} />
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full px-2 pt-4">
      <div className="flex items-center justify-center w-full">
        <MovieArchiveFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>

      <Badge className="bg-slate-200 hover:bg-slate-200 rounded-xl w-fit px-2 flex gap-1 items-center text-black">
        {/* label */}
        <p className="font-bold"> Season </p>
        {/* //value */}
        {selectedFilter?.season}
        <Button
          variant="ghost"
          className="h-4 w-4 [&_svg]:size-3 px-0 hover:bg-slate-200"
          onClick={() => {}} //onclick handler => remove
        >
          <X />
        </Button>
      </Badge>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">{pages}</div>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </div>
  );
};

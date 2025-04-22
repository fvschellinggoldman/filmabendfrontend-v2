import { useState } from "react";
import { InfiniteLoader } from "../../InfiniteLoader/InfiniteLoader";
import MovieArchiveFilter from "./MovieArchiveFilter";
import { MovieFilter } from "@/types/movie";
import MovieArchivePage from "./MovieArchivePage";

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const [selectedFilter, setSelectedFilter] = useState<MovieFilter>();
  const [selectedRating, setSelectedRating] = useState("0");
  const [selectedOperator, setSelectedOperator] = useState(">");

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<MovieArchivePage index={i} key={i} hidden={false} />);
    pages.push(
      <MovieArchivePage index={i + 1} key={`hidden_${i}`} hidden={true} />
    );
  }

  const handleOperatorChange = (value: string) => {
    setSelectedOperator(value);
    setSelectedFilter(`Rating ${value} ${selectedRating}`);
  };

  const handleRatingChange = (value: string) => {
    setSelectedRating(value);
    setSelectedFilter(`Rating ${selectedOperator} ${value}`);
  };

  // Could think about making this a HOC -> Takes in the select content component

  return (
    <div className="flex flex-col gap-2 w-full px-2 pt-4">
      <div className="flex items-center justify-center w-full">
        <MovieArchiveFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">{pages}</div>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </div>
  );
};

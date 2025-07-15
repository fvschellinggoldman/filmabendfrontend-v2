import { useState } from "react";
import { InfiniteLoader } from "../../InfiniteLoader/InfiniteLoader";
import MovieArchiveFilter from "./MovieArchiveFilter";
import { MovieFilter } from "@/types/movie";
import MovieArchivePage from "./MovieArchivePage";
import MovieArchiveFilterPill from "./MovieArchiveFilterPill";

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const [selectedFilter, setSelectedFilter] = useState<MovieFilter>();

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(
      <MovieArchivePage
        index={i}
        key={i}
        hidden={false}
        selectedFilter={selectedFilter}
      />
    );
    pages.push(
      <MovieArchivePage
        index={i + 1}
        key={`hidden_${i}`}
        hidden={true}
        selectedFilter={selectedFilter}
      />
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

      <div className="flex flex-row gap-2">
        {selectedFilter?.name && (
          <MovieArchiveFilterPill
            label="Name: "
            value={selectedFilter.name}
            handleRemove={() => {
              setSelectedFilter((prev) => ({ ...prev, name: undefined }));
            }}
          />
        )}
        {selectedFilter?.rating && (
          <MovieArchiveFilterPill
            label="Rating "
            value={`${selectedFilter.rating.ratingOperator} ${selectedFilter.rating.ratingValue}`}
            handleRemove={() => {
              setSelectedFilter((prev) => ({ ...prev, rating: undefined }));
            }}
          />
        )}
        {selectedFilter?.season && (
          <MovieArchiveFilterPill
            label="Season: "
            value={selectedFilter.season}
            handleRemove={() => {
              setSelectedFilter((prev) => ({ ...prev, season: undefined }));
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">{pages}</div>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </div>
  );
};

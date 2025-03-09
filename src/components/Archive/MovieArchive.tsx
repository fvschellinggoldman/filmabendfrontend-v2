import MovieArchivePage from "./MovieArchivePage";
import { useState } from "react";
import { InfiniteLoader } from "../InfiniteLoader/InfiniteLoader";

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<MovieArchivePage index={i} key={i} hidden={false} />);
    pages.push(<MovieArchivePage index={i + 1} key={i} hidden={true} />);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 px-2">{pages}</div>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </>
  );
};

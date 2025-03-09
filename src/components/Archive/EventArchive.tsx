import { useState } from "react";
import { InfiniteLoader } from "../InfiniteLoader/InfiniteLoader";
import { EventArchivePage } from "./EventArchivePage";

export const EventArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<EventArchivePage index={i} key={i} hidden={false} />);
    pages.push(<EventArchivePage index={i + 1} key={i} hidden={true} />);
  }

  return (
    <div className="px-2">
      {pages}
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </div>
  );
};

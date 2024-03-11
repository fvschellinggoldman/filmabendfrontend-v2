import { Box } from "@mui/system";
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
    <Box sx={{ mt: 2 }}>
      {pages}
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </Box>
  );
};

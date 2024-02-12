import { ImageList } from "@mui/material";
import MovieArchivePage from "./MovieArchivePage";
import { useEffect, useState } from "react";
import { InfiniteLoader } from "../InfiniteLoader/InfiniteLoader";

export const MovieArchive = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const columnAmount = screenWidth <= 600 ? 1 : 4;

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(<MovieArchivePage index={i} key={i} hidden={false} />);
    pages.push(<MovieArchivePage index={i + 1} key={i} hidden={true} />);
  }

  return (
    <>
      <ImageList cols={columnAmount} gap={6}>
        {pages}
      </ImageList>
      <InfiniteLoader oldIndex={pageIndex} handleChange={setPageIndex} />
    </>
  );
};

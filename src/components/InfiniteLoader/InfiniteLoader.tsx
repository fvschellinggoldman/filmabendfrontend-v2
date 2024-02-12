import { FC } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteLoaderProps {
  oldIndex: number;
  handleChange: (newIndex: number) => void;
}

export const InfiniteLoader: FC<InfiniteLoaderProps> = ({
  oldIndex,
  handleChange,
}) => {
  const { ref } = useInView({
    threshold: 0,
    onChange: () => handleChange(oldIndex + 1),
  });
  return <div ref={ref} style={{ height: "30px" }}></div>;
};

import { MovieSuggestion } from "@/types/movie";
import {
  motion,
  useMotionValue,
  useAnimation,
  useDragControls,
} from "motion/react";
import { ReactNode, useRef, useState } from "react";

interface MovieEventSuggestionProps {
  movieSuggestion: MovieSuggestion;
  handleSuggestionAction?: (
    movieSuggestion: MovieSuggestion,
    action: "accept" | "decline"
  ) => void;
}

const MovieSuggestionElement = ({
  movieSuggestion,
}: MovieEventSuggestionProps) => {
  const x = useMotionValue(0);
  // const controls = useAnimation();
  const cardElem = useRef<HTMLDivElement>(null);

  const [constrained, setConstrained] = useState(true);

  const [direction, setDirection] = useState();

  const [velocity, setVelocity] = useState();

  const [dragDistance, setDragDistance] = useState({ x: 0, y: 0 });

  const getAction = (
    childNode: HTMLDivElement,
    parentNode: HTMLDivElement
  ): string | undefined => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();

    if (parentRect.left >= childRect.right) {
      return "decline";
    } else if (parentRect.right <= childRect.left) {
      return "accept";
    } else {
      return;
    }
  };

  const distance = Math.hypot(dragDistance.x, dragDistance.y);
  const opacity = Math.max(1 - distance / 300, 0.2);

  return (
    <motion.div
      drag={"x"}
      dragMomentum={false}
      onDrag={(event, info) => setDragDistance(info.offset)}
      onDragEnd={}
    >
      <img
        className={`max-w-[80vw] max-h-[80vh] border-2 border-solid border-black transition-opacity`}
        style={{ opacity }}
        alt={`Movie poster for ${movieSuggestion.originalTitle}`}
        draggable={false}
        src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterPath}`}
      ></img>
      <p>
        Dragged Distance: X: {dragDistance.x.toFixed(2)}, Y:{" "}
        {dragDistance.y.toFixed(2)}
      </p>
    </motion.div>

    // <div className={`flex items-center justify-center`}>
    //   MovieSuggestionElementSingle
    // </div>
  );
};
export default MovieSuggestionElement;

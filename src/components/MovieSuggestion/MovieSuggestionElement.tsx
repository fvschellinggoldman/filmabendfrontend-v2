import { MovieSuggestion } from "@/types/movie";
import { Check, Cross, X } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useAnimation,
  useDragControls,
  useTransform,
} from "motion/react";
import { ReactNode, useRef, useState } from "react";
import { Button } from "../ui/button";

interface MovieEventSuggestionProps {
  movieSuggestion: MovieSuggestion;
  handleSuggestionAction: (
    movieSuggestion: MovieSuggestion,
    action: "accept" | "decline"
  ) => void;
}

const MovieSuggestionElement = ({
  movieSuggestion,
  handleSuggestionAction,
}: MovieEventSuggestionProps) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const opacityAccept = useTransform(x, [-150, 0, 150], [0, 0.5, 1]);
  const opacityDecline = useTransform(x, [-150, 0, 150], [1, 0.5, 0]);

  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    const xValue = x.get();
    if (xValue > 50) handleSuggestionAction(movieSuggestion, "accept");
    else if (xValue < -50) handleSuggestionAction(movieSuggestion, "decline");
    else return;
  };

  return (
    <div className="flex flex-col gap-4">
      <motion.img
        className={`max-w-[80vw] max-h-[60vh] rounded-lg hover:cursor-grab active:cursor-grabbing`}
        drag="x"
        dragMomentum={false}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{ x, opacity, rotate }}
        alt={`Movie poster for ${movieSuggestion.originalTitle}`}
        src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterPath}`}
        onDragEnd={handleDragEnd}
      ></motion.img>

      <div className="flex flex-row justify-between">
        <motion.div style={{ opacity: opacityDecline }}>
          <Button
            className="rounded-md bg-[#cb6565] border-black w-[100px]"
            variant="outline"
          >
            <X />
          </Button>
        </motion.div>

        <motion.div style={{ opacity: opacityAccept }}>
          <Button
            className="rounded-md bg-[#88c2a5] border-black w-[100px]"
            variant="outline"
          >
            <Check />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
export default MovieSuggestionElement;

import { FC, useEffect } from "react";
import { MovieSuggestion } from "@/types/movie";
import { DialogContent } from "../ui/dialog";
import { X, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Small } from "shadcn-typography";

interface MovieSuggestionDialogProps {
  movieSuggestion: MovieSuggestion;
  eventId: number;
  handleSuggestionAction: (
    movieSuggestion: MovieSuggestion,
    action: "accept" | "decline"
  ) => void;
}

const MovieSuggestionDialog: FC<MovieSuggestionDialogProps> = ({
  movieSuggestion,
  handleSuggestionAction,
}) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const opacityAccept = useTransform(x, [-150, 0, 150], [0, 0.5, 1]);
  const opacityDecline = useTransform(x, [-150, 0, 150], [1, 0.5, 0]);

  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const controls = useAnimation();

  const handleDragEnd = () => {
    const xValue = x.get();
    if (xValue > 50) handleSuggestionAction(movieSuggestion, "accept");
    else if (xValue < -50) handleSuggestionAction(movieSuggestion, "decline");
    else return;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({
        x: [0, -10, 10, -10, 10, -5, 5, -5, 5, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }, 3000); // Start after 3 seconds

    // Set up a repeating interval for the shake
    const intervalId = setInterval(() => {
      controls.start({
        x: [0, -10, 10, -10, 10, -5, 5, -5, 5, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }, 10000); // Repeat every 10 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [controls]);

  return (
    <DialogContent className="rounded-md w-fit pb-4">
      <div className={"flex flex-col gap-4 text-center"}>
        <motion.img
          className={`max-w-[80vw] max-h-[60vh] rounded-lg hover:cursor-grab active:cursor-grabbing`}
          drag="x"
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          animate={controls}
          initial={{ x: 0 }}
          style={{ x, opacity, rotate }}
          alt={`Movie poster for ${movieSuggestion.originalTitle}`}
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterPath}`}
          onDragEnd={handleDragEnd}
        ></motion.img>
        <Small>{movieSuggestion.title}</Small>
        <div className="flex flex-row justify-between">
          <motion.div style={{ opacity: opacityDecline }}>
            <Button
              className="rounded-md bg-[#cb6565] border-black w-[100px]"
              variant="outline"
              onClick={() => handleSuggestionAction(movieSuggestion, "decline")}
            >
              <X />
            </Button>
          </motion.div>

          <motion.div style={{ opacity: opacityAccept }}>
            <Button
              className="rounded-md bg-[#88c2a5] border-black w-[100px]"
              variant="outline"
              onClick={() => handleSuggestionAction(movieSuggestion, "accept")}
            >
              <Check />
            </Button>
          </motion.div>
        </div>
      </div>
    </DialogContent>
  );
};

export default MovieSuggestionDialog;

import React, { FC, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  addSuggestedMovie,
  declineSuggestedMovie,
} from "../../api/movies/Movies";
import { useFetchMovieEventSuggestions } from "../../api/events/MovieEventSuggestion";
import { Dialog, DialogContent, Typography } from "@mui/material";
import SuggestionTutorialOverlay from "../SuggestionTutorialOverlay/SuggestionTutorialOverlay";
import { useFetchUserPreference } from "../../api/users/UserPreferences";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import WebSuggestionTutorialOverlay from "../WebSuggestionTutorialOverlay/WebSuggestionTutorialOverlay";
import { toast } from "sonner";
import MovieSuggestionElement from "./MovieSuggestionElement";

interface MovieSuggestionDialogProps {
  handleCloseSuggestionModal: () => void;
  eventId: number;
}

const MovieSuggestionDialog: FC<MovieSuggestionDialogProps> = ({
  handleCloseSuggestionModal,
  eventId,
}) => {
  const { userPreference } = useFetchUserPreference();
  const { movieSuggestion } = useFetchMovieEventSuggestions(eventId);
  const [showTutorial, setShowTutorial] = useState(
    isMobile
      ? userPreference.showMobileTutorial
      : userPreference.showWebTutorial
  );
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => declineSuggestedMovie(movieSuggestion),
    onSwipedRight: () => addSuggestedMovie(movieSuggestion),
    onSwipedDown: () => handleCloseSuggestionModal(),
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowTutorial(
      isMobile
        ? userPreference.showMobileTutorial
        : userPreference.showWebTutorial
    );
  }, [userPreference]);

  if (!movieSuggestion) {
    handleCloseSuggestionModal();
    toast.info("Out of suggestions for this event!");
    return <></>;
  }

  const mouseDownHandler = (event: React.MouseEvent) => {
    const { clientX } = event.nativeEvent;
    const clickedOnLeft = clientX < screenWidth / 2;
    if (clickedOnLeft) {
      declineSuggestedMovie(movieSuggestion);
    } else {
      addSuggestedMovie(movieSuggestion);
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <DialogContent>
      <div className={"flex flex-col text-center justify-center items-center"}>
        <MovieSuggestionElement movieSuggestion={movieSuggestion} />
      </div>

      {/* <img
        className={
          "max-w-[80vw] max-h-[80vh] border-2 border-solid border-black"
        }
        onMouseDown={mouseDownHandler}
        alt={`Movie poster for ${movieSuggestion.originalTitle}`}
        src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterPath}`}
      ></img>
      <div
        className={
          "flex absolute bottom-[0.5vw] left-0 right-0 align items-center justify-center bg-white/90 h-[9%]"
        }
      >
        <Typography variant="body2">{movieSuggestion.title}</Typography>
      </div> */}
      {false && (
        <>
          <BrowserView>
            <Dialog open={true} onClose={handleCloseTutorial}>
              <WebSuggestionTutorialOverlay
                closeDialog={handleCloseTutorial}
              ></WebSuggestionTutorialOverlay>
            </Dialog>
          </BrowserView>
          <MobileView>
            <Dialog open={true} onClose={handleCloseTutorial}>
              <SuggestionTutorialOverlay
                closeDialog={handleCloseTutorial}
              ></SuggestionTutorialOverlay>
            </Dialog>
          </MobileView>
        </>
      )}
    </DialogContent>
  );
};

export default MovieSuggestionDialog;

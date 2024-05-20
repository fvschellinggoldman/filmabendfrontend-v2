import React, { FC, useEffect, useState } from "react";
import styles from "./MovieSuggestionElement.module.scss";
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

interface MovieSuggestionElementProps {
  handleCloseSuggestionModal: () => void;
  eventId: number;
}

const MovieSuggestionElement: FC<MovieSuggestionElementProps> = ({
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
    <DialogContent {...swipeHandlers} className={styles.MovieSuggestionElement}>
      <img
        className={styles.SuggestionImage}
        onMouseDown={mouseDownHandler}
        alt={`Movie poster for ${movieSuggestion.originalTitle}`}
        src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${movieSuggestion.moviePosterPath}`}
      ></img>
      <div className={styles.TextContainer}>
        <Typography variant="body2" className={styles.OverlayText}>
          {movieSuggestion.title}
        </Typography>
      </div>
      {showTutorial && (
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

export default MovieSuggestionElement;

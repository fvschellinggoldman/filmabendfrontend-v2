import { DialogContent } from "@mui/material";
import React, { FC } from "react";
import TutorialAcceptance from "../TutorialAcceptance/TutorialAcceptance";
import styles from "./SuggestionTutorialOverlay.module.scss";

interface SuggestionTutorialOverlayProps {
  closeDialog: () => void;
}

const SuggestionTutorialOverlay: FC<SuggestionTutorialOverlayProps> = ({
  closeDialog,
}) => {
  return (
    <DialogContent className={styles.SuggestionTutorialOverlay}>
      <div className={styles.ImageContainer}>
        <div className={styles.ImageOverlay}>
          <img
            className={styles.ImageTutorial}
            src="https://filmabend-bucket.s3.eu-central-1.amazonaws.com/posters/tt0371746.jpg"
          ></img>
          <i className="fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
      </div>

      <div>
        To add the movie to the current event, swipe <b>right</b>. <br />
        To decline adding the movie to the current event, swipe <b>
          left
        </b>. <br />
        To close the window, swipe <b>down</b>.
      </div>
      <TutorialAcceptance closeDialog={closeDialog}></TutorialAcceptance>
    </DialogContent>
  );
};

export default SuggestionTutorialOverlay;

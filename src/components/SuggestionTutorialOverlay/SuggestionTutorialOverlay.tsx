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
            alt="Example movie poster for the Tutorial"
            src="https://filmabend-bucket.s3.eu-central-1.amazonaws.com/posters/tt0371746.jpg"
          ></img>
          <i className="fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
      </div>

      <div className={styles.InstructionsContainer}>
        Swipe <b> right </b> to add. <br />
        Swipe <b> left </b> to decline. <br />
        Swipe <b> down </b> to close.
      </div>
      <TutorialAcceptance closeDialog={closeDialog}></TutorialAcceptance>
    </DialogContent>
  );
};

export default SuggestionTutorialOverlay;

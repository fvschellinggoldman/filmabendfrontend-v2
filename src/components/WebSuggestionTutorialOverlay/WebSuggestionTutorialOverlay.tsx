import { DialogContent } from "@mui/material";
import React, { FC } from "react";
import TutorialAcceptance from "../TutorialAcceptance/TutorialAcceptance";
import styles from "./WebSuggestionTutorialOverlay.module.scss";
import cn from "classnames";

interface WebSuggestionTutorialOverlayProps {
  closeDialog: () => void;
}

const WebSuggestionTutorialOverlay: FC<WebSuggestionTutorialOverlayProps> = ({
  closeDialog,
}) => {
  return (
    <DialogContent>
      <div className={styles.WebSuggestionTutorialOverlay}>
        <img
          className={styles.TutorialImage}
          src="https://filmabend-bucket.s3.eu-central-1.amazonaws.com/posters/tt0371746.jpg"
        ></img>
        <div
          className={cn(
            styles.WebTutorialOverlayContainer,
            styles.LeftContainer
          )}
        ></div>
        <div
          className={cn(
            styles.WebTutorialOverlayContainer,
            styles.RightContainer
          )}
        ></div>
      </div>
      <div>
        To add the movie to the current event, click the <b>right</b> side of
        the image. <br />
        To decline adding the movie to the current event, click the <b>
          left
        </b>{" "}
        side of the image. <br />
      </div>
      <TutorialAcceptance closeDialog={closeDialog}></TutorialAcceptance>
    </DialogContent>
  );
};

export default WebSuggestionTutorialOverlay;

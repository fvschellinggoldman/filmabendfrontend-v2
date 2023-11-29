import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import styles from "./SuggestionTutorialOverlay.module.scss";

interface SuggestionTutorialOverlayProps {}

const SuggestionTutorialOverlay: FC<SuggestionTutorialOverlayProps> = () => {
  return (
    <div className={styles.SuggestionTutorialOverlay}>
      <img className={styles.TutorialBaseImage}></img>
      <img className={styles.TutorialApproveImage}></img>
      <img className={styles.TutorialDeclineImage}></img>
      <div>Explanation here</div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Don't show this tutorial again."
        />
      </FormGroup>
      <Button>Understood!</Button>
    </div>
  );
};

export default SuggestionTutorialOverlay;

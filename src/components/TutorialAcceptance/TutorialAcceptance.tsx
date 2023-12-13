import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import { putRequest } from "../../api/api";
import { isMobile } from "react-device-detect";
import styles from "./TutorialAcceptance.module.scss";

interface TutorialAcceptanceProps {
  closeDialog: () => void;
}

const TutorialAcceptance: FC<TutorialAcceptanceProps> = ({ closeDialog }) => {
  const [control, setControl] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setControl(event.target.checked);
  };

  const handleClick = () => {
    console.log("etst");
    closeDialog();
    putRequest(`/api/user/update_user_preference`, {
      showWebTutorial: isMobile ? null : !control,
      showMobileTutorial: isMobile ? !control : null,
    });
  };

  return (
    <div className={styles.TutorialAcceptanceWrapper}>
      <FormControlLabel
        control={<Checkbox checked={control} onChange={handleChange} />}
        label="Don't show this tutorial again."
      />
      <Button onClick={handleClick} variant={"outlined"}>
        Understood!
      </Button>
    </div>
  );
};

export default TutorialAcceptance;

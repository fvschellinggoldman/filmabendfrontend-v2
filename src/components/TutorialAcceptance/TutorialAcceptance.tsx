import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import { putRequest } from "../../api/api";
import { isMobile } from "react-device-detect";

interface TutorialAcceptanceProps {
  closeDialog: () => void;
}

const TutorialAcceptance: FC<TutorialAcceptanceProps> = ({ closeDialog }) => {
  const [control, setControl] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setControl(event.target.checked);
  };

  const handleClick = () => {
    closeDialog();
    putRequest(`/api/user/update_user_preference`, {
      showWebTutorial: isMobile ? null : !control,
      showMobileTutorial: isMobile ? !control : null,
    });
  };

  return (
    <div className={"flex flex-col items-center text-2xl"}>
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

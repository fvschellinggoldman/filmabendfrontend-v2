import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { FC } from "react";
import styles from "./RatingInterface.module.scss";

interface RatingInterfaceProps {}

const RatingInterface: FC<RatingInterfaceProps> = () => {
  const formControlLabels = Array.from({ length: 10 }, (_, index) => (
    <FormControlLabel
      value={index}
      control={<Radio />}
      label={index}
      key={index}
    />
  ));

  return (
    <div className={styles.RatingInterface}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {formControlLabels}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RatingInterface;

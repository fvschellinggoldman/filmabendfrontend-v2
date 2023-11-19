import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Controller, FieldValues, set, useForm } from "react-hook-form";
import { mutate } from "swr";
import { postRequest } from "../../api/api";
import { RatingQueueElement } from "../../types/rating";
import styles from "./RatingInterface.module.scss";

type IRatingFormInput = {
  rating: number;
};

interface RatingInterfaceProps {
  ratingQueueElement: RatingQueueElement;
}

const RatingInterface: FC<RatingInterfaceProps> = ({ ratingQueueElement }) => {
  const formControlLabels = Array.from({ length: 10 }, (_, index) => (
    <FormControlLabel
      value={index + 1}
      control={<Radio color="secondary" />}
      label={index + 1}
      key={index}
    />
  ));

  const [userHasRated, setUserHasRated] = useState<boolean>(
    ratingQueueElement.currentUserHasRated
  );

  const { control, handleSubmit } = useForm<IRatingFormInput>();

  const onSubmit = async (data: IRatingFormInput) => {
    const { rating } = data;
    setUserHasRated(true);
    await postRequest(`/api/movie/${ratingQueueElement.movie.id}/rate`, {
      rating,
    });
  };

  return (
    <div className={styles.RatingInterface}>
      {!userHasRated ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.RatingForm}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" color="secondary">
              Rating for {ratingQueueElement.movie.name}
            </FormLabel>
            <Controller
              name="rating"
              control={control}
              render={({ field }: { field: FieldValues["rating"] }) => (
                <RadioGroup
                  row
                  {...field}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {formControlLabels}
                </RadioGroup>
              )}
            />
          </FormControl>
          <input type="submit" className={styles.RatingSubmitButton} />
        </form>
      ) : (
        <p>Waiting for results to be tallied.</p>
      )}
    </div>
  );
};

export default RatingInterface;

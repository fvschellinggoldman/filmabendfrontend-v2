import React, { FC } from "react";
import { RatingQueueElement } from "../../types/rating";
import styles from "./RatingResult.module.scss";

interface RatingResultProps {
  ratingQueueElement: RatingQueueElement;
}

const RatingResult: FC<RatingResultProps> = ({ ratingQueueElement }) => {
  return (
    <div className={styles.RatingResult}>
      <p>
        {" "}
        Overall rating for {ratingQueueElement.movie.name} is{" "}
        {ratingQueueElement.movie.averageRating}
      </p>
      {ratingQueueElement.breakdown.map((ratingResult) => (
        <p>
          {" "}
          {ratingResult.displayName} : {ratingResult.rating}{" "}
        </p>
      ))}
    </div>
  );
};

export default RatingResult;

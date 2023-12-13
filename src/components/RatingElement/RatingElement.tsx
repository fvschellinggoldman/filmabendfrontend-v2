// RatingElement.js
import React, { FC, useState } from "react";
import { toast } from "sonner";
import { postRequest } from "../../api/api";
import { Movie } from "../../types/movie";
import { RatingStatus } from "../../types/rating";
import styles from "./RatingElement.module.scss";

interface RatingElementProps {
  movie: Movie;
  ratingStatus: RatingStatus;
}

const RatingElement: FC<RatingElementProps> = ({ movie, ratingStatus }) => {
  const handleRectangleClick = (index: number) => {
    toast.success(`Rated ${movie.name} with ${index}`);
    setUserHasRated(true);
    postRequest(`/api/movie/${movie.id}/rate`, {
      rating: index.toString(),
    });
  };

  const [userHasRated, setUserHasRated] = useState<boolean>(
    ratingStatus.currentUserHasRated
  );

  const colorScale = [
    "#A9D6E5",
    "#89C2D9",
    "#61A5C2",
    "#468FAF",
    "#2C7DA0",
    "#2A6F97",
    "#014F86",
    "#01497C",
    "#013A63",
    "#012A4A",
  ];

  return (
    <>
      {userHasRated ? (
        <p>Waiting for results to be tallied.</p>
      ) : (
        <div className={styles.RatingElement}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`${movie.id}_rating_${index}`}
              className={styles.rectangle}
              style={{ backgroundColor: colorScale[index] }}
              onClick={() => handleRectangleClick(10 - index)}
            >
              {10 - index}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RatingElement;

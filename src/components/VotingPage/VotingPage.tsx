import { Divider, ImageList } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import VotingElement from "../VotingElement/VotingElement";
import styles from "./VotingPage.module.scss";
import SearchInterface from "../SearchInterface/SearchInterface";
import EventImage from "../EventImage/EventImage";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import RatingInterface from "../RatingInterface/RatingInterface";
import { useEvent } from "../../api/events/Events";
import { useFetchRatingQueue } from "../../api/movies/RatingQueue";
import RatingResult from "../RatingResult/RatingResult";
import { RatingState } from "../../types/rating";

interface VotingPageProps {}

const VotingPage: FC<VotingPageProps> = () => {
  const { isLoggedIn } = useAuth();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { event } = useEvent();
  const { ratingQueue } = useFetchRatingQueue();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" />;
  }
  if (!event) {
    return <Navigate to="/login" />;
  }

  const columnAmount = screenWidth <= 600 ? 1 : 3;
  const movies = event ? event.movies : [];
  if (event && event.closed) {
    movies.sort((a, b) => b.votes.length - a.votes.length);
  }

  return (
    <div>
      <EventImage event={event}></EventImage>
      {ratingQueue.map((ratingQueueElement, index) =>
        ratingQueueElement.state === RatingState.OPEN ? (
          <RatingInterface
            key={`Rating${ratingQueueElement.movie.id}`}
            ratingQueueElement={ratingQueueElement}
          ></RatingInterface>
        ) : (
          <RatingResult ratingQueueElement={ratingQueueElement} />
        )
      )}
      <div className={styles.VotingPageContainer}>
        <ImageList className={styles.ImageList} cols={columnAmount}>
          {movies.map((movie) => (
            <VotingElement movie={movie} key={movie.id}></VotingElement>
          ))}
        </ImageList>
        <Divider orientation="vertical" flexItem={true}></Divider>
        <SearchInterface event={event}></SearchInterface>
      </div>
    </div>
  );
};

export default VotingPage;

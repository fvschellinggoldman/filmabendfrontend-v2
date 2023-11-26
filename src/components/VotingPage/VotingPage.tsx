import { Divider, ImageList } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import VotingElement from "../VotingElement/VotingElement";
import styles from "./VotingPage.module.scss";
import SearchInterface from "../SearchInterface/SearchInterface";
import EventImage from "../EventImage/EventImage";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import { useEvent } from "../../api/events/Events";

interface VotingPageProps {}

const VotingPage: FC<VotingPageProps> = () => {
  const { isLoggedIn } = useAuth();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { event } = useEvent();

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

  const columnAmount = screenWidth <= 600 ? 1 : 3;
  const movies = event ? event.movies : [];
  if (event && event.closed) {
    movies.sort((a, b) => b.votes.length - a.votes.length);
  }

  return (
    <>
      {event && (
        <div>
          <EventImage event={event}></EventImage>
          <div className={styles.VotingPageContainer}>
            <ImageList
              sx={{ "overflow-y": "visible !important" }}
              className={styles.ImageList}
              cols={columnAmount}
              gap={6}
            >
              {movies.map((movie) => (
                <VotingElement
                  movie={movie}
                  key={movie.id}
                  eventClosed={event.closed}
                ></VotingElement>
              ))}
            </ImageList>
            <Divider orientation="vertical" flexItem={true}></Divider>
            <SearchInterface event={event}></SearchInterface>
          </div>
        </div>
      )}
    </>
  );
};

export default VotingPage;

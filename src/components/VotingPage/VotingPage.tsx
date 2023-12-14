import { Dialog, Divider, ImageList } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import VotingElement from "../VotingElement/VotingElement";
import styles from "./VotingPage.module.scss";
import SearchInterface from "../SearchInterface/SearchInterface";
import EventImage from "../EventImage/EventImage";
import { useEvent } from "../../api/events/Events";
import MovieSuggestionElement from "../MovieSuggestion/MovieSuggestionElement";
import { useFetchUser } from "../../api/users/Users";

interface VotingPageProps {}

const VotingPage: FC<VotingPageProps> = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { event } = useEvent();
  const { user } = useFetchUser();
  const [showMovieSuggestionModal, setShowMovieSuggestionModal] =
    useState(false);

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

  if (!user) {
    return <></>;
  }

  const columnAmount = screenWidth <= 600 ? 1 : 3;
  const movies = event ? event.movies : [];
  if (event && event.closed) {
    movies.sort(
      (a, b) =>
        (b.rateable ? 1 : 0) - (a.rateable ? 1 : 0) ||
        b.votes.length - a.votes.length
    );
  }

  const handleOpenSuggestionModal = () => {
    setShowMovieSuggestionModal(true);
  };
  const handleCloseSuggestionModal = () => {
    setShowMovieSuggestionModal(false);
  };

  return (
    <>
      {event && (
        <div>
          <EventImage event={event}></EventImage>
          <Dialog
            open={showMovieSuggestionModal}
            onClose={handleCloseSuggestionModal}
            maxWidth="lg"
          >
            <MovieSuggestionElement
              handleCloseSuggestionModal={handleCloseSuggestionModal}
              eventId={event.id}
            ></MovieSuggestionElement>
          </Dialog>

          <div className={styles.VotingPageContainer}>
            <ImageList
              sx={{ overflowY: "visible !important" }}
              className={styles.ImageList}
              cols={columnAmount}
              gap={6}
            >
              {movies.map((movie) => (
                <VotingElement
                  movie={movie}
                  key={movie.id}
                  eventClosed={event.closed}
                  isUserAdmin={user.moderator}
                ></VotingElement>
              ))}
            </ImageList>
            <Divider orientation="vertical" flexItem={true}></Divider>
            <SearchInterface
              event={event}
              user={user}
              suggestionModalHandler={handleOpenSuggestionModal}
            ></SearchInterface>
          </div>
        </div>
      )}
    </>
  );
};

export default VotingPage;

import React, { FC, useState } from "react";
import styles from "./EventImage.module.scss";
import LockIcon from "@mui/icons-material/Lock";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { Event } from "../../types/event";
import { AddCircle } from "@mui/icons-material";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";
import { User } from "../../types/user";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Action } from "../../types/action";

interface EventImageProps {
  event: Event;
  user: User;
}

const EventImage: FC<EventImageProps> = ({ event, user }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [startingEvent, setStartingEvent] = useState(false);

  const closeVoting = async () => {
    toast.success(`${event.name} has been closed for voting!`);
    await postRequest(`/api/event/${event.id}`, {});
    mutate("/api/event");
  };

  const startNewEvent = async () => {
    toast.success(`New event is being started!`);
    await postRequest(`/api/event`, {});
    mutate("/api/event");
  };

  const handleNewEventClick = () => {
    setStartingEvent(true);
    user.userPreference && user.userPreference.enableSafeMode
      ? setShowConfirmationModal(true)
      : startNewEvent();
  };

  const handleCloseEventClick = () => {
    setStartingEvent(false);
    user.userPreference && user.userPreference.enableSafeMode
      ? setShowConfirmationModal(true)
      : closeVoting();
  };

  return (
    <>
      {showConfirmationModal && (
        <ConfirmationModal
          open={true}
          action={startingEvent ? Action.event : Action.closeVoting}
          descriptionText={
            startingEvent
              ? "This will start a new event."
              : `This will close the event ${event.name} for voting.`
          }
          setModalState={setShowConfirmationModal}
          confirmationFunction={startingEvent ? startNewEvent : closeVoting}
        />
      )}
      <div className={styles.EventImageContainer}>
        <img
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${event?.imageUrl}`}
          width="100%"
          height={200}
          alt="Event"
        ></img>
        <div className={styles.OverlayText}>{event?.name}</div>
        {user.moderator && (
          <Toolbar className={styles.OverlayToolbar}>
            <Tooltip title="Close Voting">
              <IconButton
                onClick={handleCloseEventClick}
                color="inherit"
                aria-label="close voting"
              >
                <LockIcon style={{ fontSize: "36px" }}></LockIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Create new Event">
              <IconButton
                onClick={handleNewEventClick}
                color="inherit"
                aria-label="create event"
              >
                <AddCircle style={{ fontSize: "36px" }}></AddCircle>
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </div>
    </>
  );
};

export default EventImage;

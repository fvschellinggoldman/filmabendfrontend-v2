import React, { FC, useState } from "react";
import styles from "./EventImage.module.scss";
import LockIcon from "@mui/icons-material/Lock";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { Event } from "../../types/event";
import { AddCircle } from "@mui/icons-material";
import EventCreationModal from "../EventCreationModal/EventCreationModal";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";

interface EventImageProps {
  event: Event;
}

const EventImage: FC<EventImageProps> = ({ event }) => {
  const closeVoting = async () => {
    toast.success(`${event.name} has been closed for voting!`);
    await postRequest(`/api/event/${event.id}`, {});
    mutate("/api/event");
  };

  const [showEventCreationModal, setShowEventCreationModal] = useState(false);

  return (
    <>
      {showEventCreationModal && <EventCreationModal></EventCreationModal>}
      <div className={styles.EventImageContainer}>
        <img
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${event?.imageUrl}`}
          width="100%"
          height={200}
          alt="Event"
        ></img>
        <div className={styles.OverlayText}>{event?.name}</div>
        <Toolbar className={styles.OverlayToolbar}>
          <Tooltip title="Close Voting">
            <IconButton
              onClick={closeVoting}
              color="inherit"
              aria-label="close voting"
            >
              <LockIcon style={{ fontSize: "36px" }}></LockIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Create new Event">
            <IconButton
              onClick={() => setShowEventCreationModal(true)}
              color="inherit"
              aria-label="create event"
            >
              <AddCircle style={{ fontSize: "36px" }}></AddCircle>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </div>
    </>
  );
};

export default EventImage;

import { FC, useState } from "react";
import { Event } from "../../types/event";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";
import { User } from "../../types/user";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Action } from "../../types/action";
import { Button } from "../ui/button";
import { CalendarPlus, Lock } from "lucide-react";

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
      <div className={"relative w-full flex flex-col items-center bg-white "}>
        <img
          src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${event?.imageUrl}`}
          width="100%"
          alt="Event"
          className="object-cover rounded h-[200px]"
        ></img>
        <div className="absolute top-1/3 text-2xl text-white">
          {event?.name}
        </div>

        {user.moderator && (
          <div className="absolute top-2/3 text-white gap-2 flex flex-row">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewEventClick}
              className="[&_svg]:size-6"
            >
              <Lock />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseEventClick}
              className="[&_svg]:size-6"
            >
              <CalendarPlus />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventImage;

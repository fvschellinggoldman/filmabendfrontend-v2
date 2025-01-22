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

      <div className="flex flex-row">
        <div className="relative w-full flex flex-col items-center">
          <img
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${event?.imageUrl}`}
            width="100%"
            alt="Event"
            className="object-cover h-[200px]"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-white/50"></div>
          <div className="absolute top-1/2 text-2xl text-white">
            {event?.name}
          </div>
          {user.moderator && (
            <div className="absolute inset-y-0 right-4 flex flex-col text-white gap-2 items-center justify-evenly opacity-100">
              <Button
                variant={"textIcon"}
                onClick={handleCloseEventClick}
                className="[&_svg]:size-6 h-fit w-full opacity-100"
                disabled={event.closed}
              >
                <Lock />
                <span className="text-xs font-medium leading-none">Close</span>
              </Button>
              <Button
                variant={"textIcon"}
                onClick={handleNewEventClick}
                className="[&_svg]:size-6 h-fit w-full"
                disabled={!event.closed}
              >
                <CalendarPlus />
                <span className="text-xs font-medium leading-none">New</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventImage;

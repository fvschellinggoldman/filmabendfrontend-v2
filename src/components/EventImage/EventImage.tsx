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
import EventImageDialog from "./EventImageDialog";
import { useInView } from "react-intersection-observer";

interface EventImageProps {
  event: Event;
  user: User;
}

const EventImage: FC<EventImageProps> = ({ event, user }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [startingEvent, setStartingEvent] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

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
      <div ref={ref} className="h-1"></div>
      <div
        className={`sticky top-0 z-10 flex flex-row ${
          inView
            ? "bg-transparent"
            : "bg-white/40 backdrop-blur-md border border-white/20"
        } shadow-xs p-4 items-center justify-center gap-2 transition-colors duration-500`}
      >
        <div className="flex flex-col justify-center items-center grow">
          <p className="line-clamp-2 font-bold text-md">{event.name}</p>
          <EventImageDialog
            imageUrl={event.imageUrl}
            eventName={event.name}
            eventId={event.id}
            eventSubmitter={event.submitter}
          />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button
            variant={"textIcon"}
            onClick={handleCloseEventClick}
            className="[&_svg]:size-6 h-fit w-14"
            disabled={event.closed}
          >
            <Lock />
            <span className="text-xs font-medium leading-none">Close</span>
          </Button>
          <Button
            variant={"textIcon"}
            onClick={handleNewEventClick}
            className="[&_svg]:size-6 h-fit w-14"
            disabled={!event.closed}
          >
            <CalendarPlus />
            <span className="text-xs font-medium leading-none">New</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventImage;

import React, { FC } from "react";
import { useFetchPastEvents } from "../../api/events/Events";
import { EventArchiveTile } from "./EventArchiveTile";

interface EventArchivePageProps {
  index: number;
  hidden: boolean;
}

export const EventArchivePage: FC<EventArchivePageProps> = ({
  index,
  hidden,
}) => {
  const { events } = useFetchPastEvents(index);

  if (!events || hidden) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {events.map((event, index) => (
        <EventArchiveTile key={event.name} event={event} index={index} />
      ))}
    </div>
  );
};

import { FC } from "react";
import VotingElement from "../VotingElement/VotingElement";
import SearchInterface from "../SearchInterface/SearchInterface";
import EventImage from "../EventImage/EventImage";
import { useEvent } from "../../api/events/Events";
import { useFetchUser } from "../../api/users/Users";

interface VotingPageProps {}

const VotingPage: FC<VotingPageProps> = () => {
  const { event } = useEvent();
  const { user } = useFetchUser();

  if (!user) {
    return <></>;
  }

  const movies = event ? event.movies : [];
  if (event && event.closed) {
    movies.sort(
      (a, b) =>
        (b.rateable ? 1 : 0) - (a.rateable ? 1 : 0) ||
        b.votes.length - a.votes.length
    );
  }

  return (
    <>
      {event && (
        <div>
          <EventImage event={event} user={user}></EventImage>
          <div className="flex flex-col sm:flex-row pt-2">
            <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-2 px-2 h-fit">
              {movies.map((movie) => (
                <VotingElement
                  movie={movie}
                  key={movie.id}
                  eventClosed={event.closed}
                  user={user}
                ></VotingElement>
              ))}
            </div>
            <div className="w-px bg-secondary"></div>
            <SearchInterface event={event} user={user}></SearchInterface>
          </div>
        </div>
      )}
    </>
  );
};

export default VotingPage;

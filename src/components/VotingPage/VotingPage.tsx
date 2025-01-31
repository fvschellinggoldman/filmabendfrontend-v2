import { FC } from "react";
import VotingElement from "../VotingElement/VotingElement";
import SearchInterface from "../SearchInterface/SearchInterface";
import EventImage from "../EventImage/EventImage";
import { useEvent } from "../../api/events/Events";
import { useFetchUser } from "../../api/users/Users";
import SkeletonPage from "../SkeletonPage/SkeletonPage";

interface VotingPageProps {}

const VotingPage: FC<VotingPageProps> = () => {
  const { event, isLoading } = useEvent();
  const { user, isLoading: userLoading } = useFetchUser();

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

  if (isLoading || userLoading) {
    return <SkeletonPage />;
  }

  return (
    <>
      {event && (
        <>
          <EventImage event={event} user={user}></EventImage>
          <SearchInterface event={event}></SearchInterface>
          <div className="flex flex-col sm:flex-row p-2">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-2 h-fit">
              {movies.map((movie) => (
                <VotingElement
                  movie={movie}
                  key={movie.id}
                  eventClosed={event.closed}
                  user={user}
                ></VotingElement>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VotingPage;

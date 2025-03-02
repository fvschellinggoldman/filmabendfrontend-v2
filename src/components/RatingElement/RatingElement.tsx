import { FC, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { postRequest } from "../../api/api";
import { Action } from "../../types/action";
import { Movie } from "../../types/movie";
import { RatingStatus } from "../../types/rating";
import { User } from "../../types/user";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Button } from "../ui/button";

interface RatingElementProps {
  movie: Movie;
  ratingStatus: RatingStatus;
  user: User;
}

const RatingElement: FC<RatingElementProps> = ({
  movie,
  ratingStatus,
  user,
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleRectangleClick = (index: number) => {
    setSelectedRating(index);
    user.userPreference && user.userPreference.enableSafeMode
      ? setShowConfirmationModal(true)
      : handleConfirmedRating(index);
  };

  const handleConfirmedRating = (index?: number) => {
    if (!index) {
      return null;
    }
    toast.success(`Rated ${movie.name} with ${index}`);
    setUserHasRated(true);
    postRequest(`/api/movie/${movie.id}/rate`, {
      rating: index.toString(),
    });
  };

  const handleRatingChange = async () => {
    toast.success(`${movie.name} has been closed for rating!`);
    await postRequest(`/api/movie/${movie.id}/modify_rating_state`, {
      newRateableState: false,
    });
    mutate(`/api/movie/${movie.id}/rating_status`);
  };

  const handleRatingStateChangeClick = () => {
    user.userPreference && user.userPreference.enableSafeMode
      ? setShowConfirmationModal(true)
      : handleRatingChange();
  };

  const [userHasRated, setUserHasRated] = useState<boolean>(
    ratingStatus.currentUserHasRated
  );

  const colorScale = [
    "#A9D6E5",
    "#89C2D9",
    "#61A5C2",
    "#468FAF",
    "#2C7DA0",
    "#2A6F97",
    "#014F86",
    "#01497C",
    "#013A63",
    "#012A4A",
  ];

  return (
    <>
      {showConfirmationModal && (
        <ConfirmationModal
          open={true}
          action={userHasRated ? Action.closeRating : Action.rating}
          descriptionText={
            userHasRated
              ? `This will close the rating for the movie ${movie.name}.`
              : `This will rate the movie ${movie.name} with a value of ${selectedRating}.`
          }
          setModalState={setShowConfirmationModal}
          confirmationFunction={
            userHasRated ? handleRatingChange : handleConfirmedRating
          }
          confirmationFunctionInput={userHasRated ? undefined : selectedRating}
        />
      )}

      {userHasRated ? (
        <div className="flex flex-col gap-2 px-2">
          <p>Waiting for results to be tallied.</p>
          {user.moderator && (
            <Button onClick={handleRatingStateChangeClick}>Close Rating</Button>
          )}
        </div>
      ) : (
        <div className={"flex flex-col h-full justify-evenly w-full p-1 gap-1"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`${movie.id}_rating_${index}`}
              className={
                "text-white text-center font-bold cursor-pointer flex justify-center items-center h-full hover:opacity-80"
              }
              style={{ backgroundColor: colorScale[index] }}
              onClick={() => handleRectangleClick(10 - index)}
            >
              {10 - index}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RatingElement;

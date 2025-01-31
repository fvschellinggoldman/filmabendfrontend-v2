import { FC, useState } from "react";
import { Movie } from "../../types/movie";
import { postRequest } from "../../api/api";
import { mutate } from "swr";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Action } from "../../types/action";
import { User } from "../../types/user";
import { Small } from "shadcn-typography";
import { Button } from "../ui/button";
import { Info, ListOrdered } from "lucide-react";

interface VotingMovieDetailsProps {
  movie: Movie;
  handleClick: () => void;
  selected: boolean;
  eventClosed: boolean;
  user: User;
}

const VotingMovieDetails: FC<VotingMovieDetailsProps> = ({
  movie,
  handleClick,
  selected,
  eventClosed,
  user,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleRatingChange = async () => {
    toast.success(`${movie.name} has been opened for rating!`);
    await postRequest(`/api/movie/${movie.id}/modify_rating_state`, {
      newRateableState: true,
    });
    mutate("/api/event");
  };

  const handleRatingChangeClick = () => {
    user.userPreference && user.userPreference.enableSafeMode
      ? setShowConfirmationModal(true)
      : handleRatingChange();
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      {showConfirmationModal && (
        <ConfirmationModal
          open={true}
          action={Action.enableRating}
          descriptionText={`This will open the movie ${movie.name} for rating.`}
          setModalState={setShowConfirmationModal}
          confirmationFunction={handleRatingChange}
        />
      )}
      <div className="flex flex-col justify-evenly h-full px-2">
        <Small>{movie.name}</Small>
        <hr />
        <Small className="italic"> {movie.genres.join(", ")}</Small>
        <hr />
        <div className="w-full gap-4 flex-col flex justify-evenly">
          <div className="flex flex-row justify-evenly">
            {eventClosed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRatingChangeClick}
                className={"[&_svg]:size-6 flex flex-col p-1 h-12 w-12"}
              >
                <ListOrdered />
                <span className="text-xs font-medium leading-none">Rate</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNavigate}
              className={"[&_svg]:size-6 flex flex-col p-1 h-12 w-12"}
            >
              <Info />
              <span className="text-xs font-medium leading-none">Info</span>
            </Button>
          </div>
          <Button
            onClick={handleClick}
            disabled={eventClosed}
            className="w-full"
          >
            {selected ? "Remove" : "Add"} Vote
          </Button>
        </div>
      </div>
    </>
  );
};

export default VotingMovieDetails;

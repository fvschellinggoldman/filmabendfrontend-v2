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
import { BookOpenText, Info, ListOrdered, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { isMobile } from "react-device-detect";
import { Label } from "../ui/label";

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
  const [showPlot, setShowPlot] = useState(false);

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

  const handleDelete = () => {
    toast.warning("Coming soon!");
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
      <div className="flex flex-col justify-evenly h-full w-full px-2">
        <Small>{movie.name}</Small>
        <hr />
        <Small className="italic"> {movie.genres.join(", ")}</Small>
        <hr />

        {eventClosed ? (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRatingChangeClick}
              className={"[&_svg]:size-6 flex flex-col p-1 h-12 w-12"}
            >
              <ListOrdered />
              <Label className="text-xs">Rate</Label>
            </Button>
          </div>
        ) : (
          <div className="w-full gap-4 flex-col flex justify-evenly">
            <div className="flex flex-row justify-evenly">
              <Popover open={showPlot}>
                <PopoverTrigger
                  onMouseLeave={() => !isMobile && setShowPlot(false)}
                  onClick={() => setShowPlot(!showPlot)}
                  className={
                    "[&_svg]:size-6 flex flex-col p-1 h-12 w-12 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground"
                  }
                >
                  <BookOpenText />
                  <Label className="text-xs">Plot</Label>
                </PopoverTrigger>
                <PopoverContent onPointerDownOutside={() => setShowPlot(false)}>
                  Coming Soon
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="cardIcon" onClick={handleNavigate}>
                <Info />
                <Label className="text-xs">Info</Label>
              </Button>
              <Button variant="ghost" size="cardIcon" onClick={handleDelete}>
                <Trash2 />
                <Label className="text-xs">Delete</Label>
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
        )}
      </div>
    </>
  );
};

export default VotingMovieDetails;

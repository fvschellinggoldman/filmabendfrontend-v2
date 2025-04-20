import { IMAGE_PREFIX } from "@/lib/const";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { Small } from "shadcn-typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { User } from "@/types/user";

interface EventImageDialogProps {
  imageUrl: string;
  eventName: string;
  eventId: number;
  eventCreator?: User;
}

const EventImageDialog = ({
  imageUrl,
  eventName,
  eventId,
  eventCreator,
}: EventImageDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [eventImageIsNew, setEventImageIsNew] = useState(false);

  useEffect(() => {
    const lastSeenEventID = localStorage.getItem("lastSeenImageEventID");
    if (lastSeenEventID !== eventId.toString()) {
      setEventImageIsNew(true);
      setOpenDialog(true);
    }
  }, []);

  const handleCloseDialog = () => {
    localStorage.setItem("lastSeenImageEventID", eventId.toString());
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant={"link"}
        className="text-xs italic py-0 h-6"
        onClick={() => setOpenDialog(true)}
      >
        See Image <SquareArrowOutUpRight size={12} />
      </Button>

      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent
          className="max-w-fit rounded"
          aria-describedby="Event Image"
        >
          {eventImageIsNew && (
            <Realistic onInit={({ conductor }) => conductor.shoot()} />
          )}
          <DialogHeader>
            <DialogTitle>{`${
              eventImageIsNew ? "New Event: " : ""
            }${eventName}`}</DialogTitle>
          </DialogHeader>
          <img src={`${IMAGE_PREFIX}${imageUrl}`} alt={eventName} />
          <div className="flex flex-row gap-2 items-center">
            <Small> Submitted by: </Small>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${eventCreator?.profilePicturePath}`}
                  />
                  <AvatarFallback>FG</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{eventCreator?.displayName}</TooltipContent>
            </Tooltip>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventImageDialog;

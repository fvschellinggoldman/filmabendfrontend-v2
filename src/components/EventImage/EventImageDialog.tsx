import { IMAGE_PREFIX } from "@/lib/const";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

interface EventImageDialogProps {
  imageUrl: string;
  eventName: string;
  eventId: number;
}

const EventImageDialog = ({
  imageUrl,
  eventName,
  eventId,
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
        <DialogContent className="max-w-5xl">
          {eventImageIsNew && (
            <Realistic onInit={({ conductor }) => conductor.shoot()} />
          )}
          <DialogHeader>
            <DialogTitle>{`${
              eventImageIsNew ? "New Event: " : ""
            }${eventName}`}</DialogTitle>
          </DialogHeader>
          <img src={`${IMAGE_PREFIX}${imageUrl}`} alt={eventName} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventImageDialog;

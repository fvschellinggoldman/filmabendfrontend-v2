import { IMAGE_PREFIX } from "@/lib/const";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface EventImageDialogProps {
  imageUrl: string;
  eventName: string;
}

const EventImageDialog = ({ imageUrl, eventName }: EventImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-fit">
        <Button variant={"link"} className={"text-xs italic py-0 h-6"}>
          See Image <SquareArrowOutUpRight size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
        </DialogHeader>
        <img src={`${IMAGE_PREFIX}${imageUrl}`} />
      </DialogContent>
    </Dialog>
  );
};
export default EventImageDialog;

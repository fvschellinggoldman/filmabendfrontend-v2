import { FC } from "react";
import { Action } from "../../types/action";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmationModalProps {
  open: boolean;
  action: Action;
  descriptionText: string;
  setModalState: (newState: boolean) => void;
  confirmationFunction: (input?: number) => void;
  confirmationFunctionInput?: number;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  action,
  descriptionText,
  setModalState,
  confirmationFunction,
  confirmationFunctionInput,
}) => {
  const handleClose = () => {
    setModalState(false);
  };

  const handleConfirm = () => {
    confirmationFunction(confirmationFunctionInput);
    setModalState(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-fit rounded-md">
        <DialogTitle>Confirm {action}?</DialogTitle>
        <DialogDescription>{descriptionText}</DialogDescription>
        <div className="flex justify-between gap-4">
          <Button onClick={handleClose}>Go Back</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

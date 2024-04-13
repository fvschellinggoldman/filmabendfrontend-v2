import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { FC } from "react";
import { Action } from "../../types/action";

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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm {action}?</DialogTitle>
      <DialogContent>
        <DialogContentText>{descriptionText}.</DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button variant="contained" onClick={handleClose}>
          Go Back
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { Avatar, Dialog, Stack, TextField } from "@mui/material";
import React, { FC } from "react";

interface ProfileSettingsProps {
  onClose: () => void;
  open: boolean;
}

export const ProfileSettings: FC<ProfileSettingsProps> = ({
  onClose,
  open,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack
        flex={1}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <form style={{ display: "flex", flexDirection: "column" }}>
          <Avatar
            alt="Profile picture"
            src="https://filmabend-bucket.s3.eu-central-1.amazonaws.com/images/profile_pictures/Screenshot_20210802-141556__01.jpg"
            sx={{ width: 256, height: 256 }}
          />
          <TextField label="Username" defaultValue="Hello World" />
          <TextField label="Password" type="password" />
          <TextField label="Confirm Password" type="password" />
        </form>
      </Stack>
    </Dialog>
  );
};

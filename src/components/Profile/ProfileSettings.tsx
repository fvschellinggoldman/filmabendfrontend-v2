import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { FC } from "react";
import { User } from "../../types/user";

interface ProfileSettingsProps {
  onClose: () => void;
  open: boolean;
  user: User;
}

export const ProfileSettings: FC<ProfileSettingsProps> = ({
  onClose,
  open,
  user,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ padding: "8px" }}>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <Grid container>
            <Grid
              xs={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Avatar
                alt="Profile picture"
                src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${user.profilePicturePath}`}
                sx={{ width: "20vh", height: "20vh" }}
              />
              <Stack direction="row">
                <Checkbox defaultChecked />
                <Stack direction="row" alignItems="center">
                  <Typography>Safe Mode</Typography>
                  <InfoOutlinedIcon />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={6}
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <TextField
                label="Username"
                defaultValue={user.displayName}
                margin="normal"
              />
              <TextField label="New Password" type="password" margin="normal" />
              <TextField
                label="Confirm New Password"
                type="password"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            padding={2}
          >
            <Button variant="contained"> Cancel </Button>

            <Button variant="contained"> Edit </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

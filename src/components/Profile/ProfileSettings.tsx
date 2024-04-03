import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import styles from "./ProfileSettings.module.scss"; // Import the styles

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { FC } from "react";
import { User } from "../../types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { editUserSettings } from "../../api/users/ProfileSettings";

interface ProfileSettingsProps {
  onClose: () => void;
  open: boolean;
  user: User;
}

export type IEditProfileFormInput = {
  displayName: string;
  password: string;
  confirmPassword: string;
};

export const ProfileSettings: FC<ProfileSettingsProps> = ({
  onClose,
  open,
  user,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<IEditProfileFormInput>();

  const onSubmit: SubmitHandler<IEditProfileFormInput> = async (data) => {
    const modifiedData: Partial<IEditProfileFormInput> = {};
    Object.keys(data).forEach((key) => {
      if (dirtyFields[key as keyof IEditProfileFormInput]) {
        modifiedData[key as keyof IEditProfileFormInput] =
          data[key as keyof IEditProfileFormInput];
      }
    });
    Object.keys(modifiedData).length && editUserSettings(modifiedData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ padding: "8px" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
                sx={{ width: "15vh", height: "15vh" }}
              />
              <Stack direction="row">
                <Checkbox defaultChecked disabled />
                <Stack direction="row" alignItems="center">
                  <Typography>Safe Mode</Typography>
                  <Tooltip title="Coming Soon">
                    <InfoOutlinedIcon />
                  </Tooltip>
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
              <input
                {...register("displayName")}
                className={styles.FormInput}
                defaultValue={user.displayName}
              />
              <input
                placeholder="New Password"
                className={styles.FormInput}
                {...register("password")}
                type="password"
                defaultValue=""
              />
              <input
                placeholder="Confirm New Password"
                className={styles.FormInput}
                {...register("confirmPassword", {
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                type="password"
                defaultValue=""
              />
              <Stack spacing={2} marginBottom={2}>
                {errors.confirmPassword && (
                  <Alert severity="error">Your passwords don't match</Alert>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            padding={2}
          >
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Edit
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

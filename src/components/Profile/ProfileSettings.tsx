import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "./ProfileSettings.module.scss"; // Import the styles

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { FC, useState } from "react";
import { User } from "../../types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomAvatar } from "./CustomAvatar";
import { mutate } from "swr";
import { putRequestFile } from "../../api/api";
import { toast } from "sonner";

interface ProfileSettingsProps {
  onClose: () => void;
  open: boolean;
  user: User;
}

export type IEditProfileFormInput = {
  displayName: string;
  password: string;
  confirmPassword: string;
  enableSafeMode: boolean;
  profilePicture: File;
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
    setValue,
    formState: { errors },
  } = useForm<IEditProfileFormInput>();

  const onSubmit: SubmitHandler<IEditProfileFormInput> = async (data) => {
    const formData = new FormData();
    data.password && formData.append("password", data.password);
    data.displayName && formData.append("display_name", data.displayName);
    data.enableSafeMode !== undefined &&
      formData.append("enable_safe_mode", data.enableSafeMode.toString());
    data.profilePicture &&
      formData.append("profile_picture", data.profilePicture);
    await putRequestFile("/api/user/edit_user_settings", formData);
    mutate("/api/users/me");
    toast.success("You have succesfully updated your settings.");
    onClose();
  };

  const [enableSafeMode, setEnableSafeMode] = useState<boolean>(
    user.userPreference?.enableSafeMode !== undefined
      ? user.userPreference?.enableSafeMode
      : true
  );

  const handleCheckboxChange = () => {
    setValue("enableSafeMode", !enableSafeMode);
    setEnableSafeMode(!enableSafeMode);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ padding: "8px" }}>
        <form
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"row"} gap={5}>
            <Stack justifyContent="center" alignItems="center">
              <CustomAvatar user={user} setValue={setValue} />
              <Stack direction="row">
                <Switch
                  checked={enableSafeMode}
                  onChange={handleCheckboxChange}
                />
                <Stack direction="row" alignItems="center">
                  <Typography>Safe Mode</Typography>
                  <Tooltip title="Get asked for confirmation before irrevertible actions">
                    <InfoOutlinedIcon />
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="column"
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
              <Stack spacing={2}>
                {errors.confirmPassword && (
                  <Alert severity="error">Your passwords don't match</Alert>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
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

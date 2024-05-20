import { Avatar, Badge } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { User } from "../../types/user";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UseFormSetValue } from "react-hook-form";
import { IEditProfileFormInput } from "./ProfileSettings";

interface FilePreview extends File {
  preview: string;
}

interface CustomAvatarProps {
  user: User;
  setValue: UseFormSetValue<IEditProfileFormInput>;
}

export const CustomAvatar: FC<CustomAvatarProps> = ({ user, setValue }) => {
  const [previewImage, setPreviewImage] = useState<FilePreview>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const file = {
        ...acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      };
      setPreviewImage(file);
      setValue("profilePicture", acceptedFiles[0]);
    },
  });

  useEffect(() => {
    return () => previewImage && URL.revokeObjectURL(previewImage.preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} />
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <AddAPhotoIcon
              style={{
                border: `3px solid white`,
                width: "2.5vh",
                height: "2.5vh",
                backgroundColor: "black",
                color: "white",
                padding: "2px",
                borderRadius: "30%",
              }}
            />
          }
        >
          {previewImage ? (
            <Avatar
              alt="Profile picture preview"
              src={previewImage.preview}
              sx={{ width: "15vh", height: "15vh" }}
            />
          ) : (
            <Avatar
              alt="Profile picture"
              src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${user.profilePicturePath}`}
              sx={{ width: "15vh", height: "15vh", ":hover": { opacity: 0.4 } }}
            ></Avatar>
          )}
        </Badge>
      </div>
    </>
  );
};

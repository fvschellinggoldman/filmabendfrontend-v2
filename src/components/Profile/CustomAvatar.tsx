import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { User } from "../../types/user";
import { UseFormSetValue } from "react-hook-form";
import { IEditProfileFormInput } from "./ProfileSettings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Camera } from "lucide-react";

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
        className="relative inline-block hover:cursor-pointer hover:opacity-40"
      >
        <input {...getInputProps()} />
        {previewImage ? (
          <Avatar className="size-[15vh]">
            <AvatarImage
              src={previewImage.preview}
              alt="Profile picture preview"
            />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="size-[15vh]">
            <AvatarImage
              src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${user.profilePicturePath}`}
              alt="Profile picture"
            />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
        )}
        <Badge
          className={
            "absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full p-0"
          }
        >
          <Camera size={18} />
        </Badge>
      </div>
    </>
  );
};

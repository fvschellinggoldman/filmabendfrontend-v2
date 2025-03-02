import { useFetchUser } from "@/api/users/Users";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { ProfileSettings } from "../Profile/ProfileSettings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavbarAvatarMenu = () => {
  const [openEditProfileModal, setOpenEditProfileModal] =
    useState<boolean>(false);

  const { user, isError } = useFetchUser();
  const { logout } = useAuth();

  if (user === undefined || isError !== undefined) {
    return null;
  }

  return (
    <>
      {openEditProfileModal && (
        <ProfileSettings
          open={openEditProfileModal}
          onClose={() => setOpenEditProfileModal(false)}
          user={user}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${user.profilePicturePath}`}
            />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenEditProfileModal(true)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default NavbarAvatarMenu;

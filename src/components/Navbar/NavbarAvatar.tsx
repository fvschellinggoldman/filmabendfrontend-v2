import { useFetchUser } from "@/api/users/Users";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { ProfileSettings } from "../Profile/ProfileSettings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
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
    <Dialog open={openEditProfileModal} onOpenChange={setOpenEditProfileModal}>
      <DropdownMenu modal={false}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Profile
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileSettings
        onClose={() => setOpenEditProfileModal(false)}
        user={user}
      />
    </Dialog>
  );
};
export default NavbarAvatarMenu;

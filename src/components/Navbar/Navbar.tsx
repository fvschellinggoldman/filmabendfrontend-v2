import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import NeonText from "../Typography/NeonText";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import NavbarAvatar from "./NavbarAvatar";
import { NavbarItem } from "@/types/navbarItem";
import { Calendar, FilmIcon, LibraryBig } from "lucide-react";

const pages: NavbarItem[] = [
  { label: "HOME", url: "/home" },
  {
    label: "ARCHIVE",
    url: "/archive",
    dropDownItems: [
      { label: "Movie", url: "/archive/movie", icon: <FilmIcon /> },
      { label: "Event", url: "/archive/event", icon: <Calendar /> },
      { label: "Category", url: "/archive/category", icon: <LibraryBig /> },
    ],
  },
  { label: "STATISTICS", url: "/statistics" },
  { label: "CREATE CATEGORIES", url: "/createCategories" },
];

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div className="flex flex-row h-14 items-center border-b w-full grow justify-between px-2">
      <div>
        <DesktopNavbar navbarItems={pages} />
        <MobileNavbar navbarItems={pages} />
      </div>
      <div
        className="md:hidden cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <NeonText text={"Filmabend"} size={5} />
      </div>

      <NavbarAvatar />
    </div>
  );
};
export default Navbar;

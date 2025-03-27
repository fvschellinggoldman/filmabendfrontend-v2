import { NavbarItem } from "@/types/navbarItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

interface DesktopNavbarProps {
  navbarItems: NavbarItem[];
}

const DesktopNavbar = ({ navbarItems }: DesktopNavbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex">
      {/* <Button variant={"link"}> FILMABEND </Button> */}

      <NavigationMenu>
        <NavigationMenuList>
          {navbarItems.map(({ label, url }) => (
            <NavigationMenuItem key={url}>
              <Button variant={"link"} onClick={() => navigate(url)}>
                {label}
              </Button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
export default DesktopNavbar;

import { NavbarItem } from "@/types/navbarItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DesktopNavbarProps {
  navbarItems: NavbarItem[];
}

const DesktopNavbar = ({ navbarItems }: DesktopNavbarProps) => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigationClick = (url: string) => {
    navigate(url);
    setDropdownOpen(false);
  };

  return (
    <div className="hidden md:flex flex-row">
      {navbarItems.map(({ label, url, dropDownItems }) => (
        <>
          {dropDownItems ? (
            <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <PopoverTrigger asChild>
                <Button variant="link" className="hover:bg-accent">
                  {label}
                  {dropdownOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit bg-background">
                <div className="flex flex-col gap-3 bg-background ">
                  {dropDownItems.map(({ url, label, icon }) => (
                    <Button
                      variant="link"
                      onClick={() => handleNavigationClick(url)}
                      className="justify-start hover:bg-accent"
                    >
                      {icon}
                      {label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="link"
              className="hover:bg-accent"
              onClick={() => handleNavigationClick(url)}
            >
              {label}
            </Button>
          )}
        </>
      ))}
    </div>
  );
};
export default DesktopNavbar;

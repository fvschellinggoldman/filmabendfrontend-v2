import { NavbarItem } from "@/types/navbarItem";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

interface MobileNavbarProps {
  navbarItems: NavbarItem[];
}

const MobileNavbar = ({ navbarItems }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  const [showArchiveDropdown, setShowArchiveDropDown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleClick = (url: string) => {
    setOpen(false);
    setShowArchiveDropDown(false);
    navigate(url);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setShowArchiveDropDown(false);
  };

  const handleOpenMore = () => {
    setShowArchiveDropDown(!showArchiveDropdown);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 pl-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle hidden>Navigation Sheet</SheetTitle>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {navbarItems.map(({ label, url, dropDownItems }) => {
              return (
                <>
                  <Button
                    key={url}
                    variant={"link"}
                    onClick={() =>
                      dropDownItems ? handleOpenMore() : handleClick(url)
                    }
                    className={`${
                      pathname.startsWith(url) ? "font-black" : ""
                    } justify-start`}
                  >
                    {label}
                    {dropDownItems &&
                      (showArchiveDropdown ? <ChevronUp /> : <ChevronDown />)}
                  </Button>
                  {showArchiveDropdown &&
                    dropDownItems &&
                    dropDownItems.map(({ label, url, icon }) => (
                      <Button
                        key={url}
                        variant={"link"}
                        onClick={() => handleClick(url)}
                        className={`justify-start ml-4 ${
                          pathname === url ? "font-black" : ""
                        }`}
                      >
                        {icon}
                        {label}
                      </Button>
                    ))}
                </>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;

import { NavbarItem } from "@/types/navbarItem";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface MobileNavbarProps {
  navbarItems: NavbarItem[];
}

const MobileNavbar = ({ navbarItems }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleClick = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {navbarItems.map(({ label, url }) => (
              <Button
                key={url}
                variant={pathname === url ? "outline" : "link"}
                onClick={() => handleClick(url)}
              >
                {label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;

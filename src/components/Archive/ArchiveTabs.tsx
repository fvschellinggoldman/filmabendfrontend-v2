import * as React from "react";
import CategoryArchive from "./CategoryArchive";
import { MovieArchive } from "./MovieArchive";
import { EventArchive } from "./EventArchive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, FilmIcon, LibraryBig } from "lucide-react";

const ArchiveTabValues = [
  {
    value: "Movie",
    icon: <FilmIcon />,
    component: <MovieArchive />,
  },
  {
    value: "Event",
    icon: <Calendar />,
    component: <EventArchive />,
  },
  {
    value: "Category",
    icon: <LibraryBig />,
    component: <CategoryArchive />,
  },
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ArchiveTabs = () => {
  return (
    <Tabs defaultValue={"Movie"} className="w-full py-2">
      <TabsList className="border-black border p-2">
        {ArchiveTabValues.map(({ value, icon }) => (
          <TabsTrigger value={value}>
            <div className="flex flex-row items-center">
              {icon}
              {value}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {ArchiveTabValues.map(({ value, component }) => (
        <TabsContent value={value}>{component}</TabsContent>
      ))}
    </Tabs>
  );
};

export default ArchiveTabs;

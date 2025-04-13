import * as React from "react";
import CategoryArchive from "./CategoryArchive";
import { MovieArchive } from "./MovieArchive";
import { EventArchive } from "./EventArchive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, FilmIcon, LibraryBig } from "lucide-react";
import MovieArchiveFilter from "./MovieArchiveFilter";

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
      <div className="flex flex-row justify-between px-2">
        <TabsList className="border-black border p-2">
          {ArchiveTabValues.map(({ value, icon }) => (
            <TabsTrigger value={value} key={`${value}Trigger`}>
              <div className="flex flex-row items-center">
                {icon}
                {value}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="max-w-60">
          <MovieArchiveFilter />
        </div>
      </div>
      {ArchiveTabValues.map(({ value, component }) => (
        <TabsContent value={value} key={value}>
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ArchiveTabs;

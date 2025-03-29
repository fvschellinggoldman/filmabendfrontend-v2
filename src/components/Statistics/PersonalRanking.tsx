import { FC } from "react";
import { useFetchPersonalRanking } from "../../api/movies/PersonalRanking";
import { UserRatedMovie } from "../../types/movie";

import { User } from "../../types/user";
import { getSortIcon } from "@/utils/getSortingIcon";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { TableSkeleton } from "../Skeletons/SkeletonTable";

const columns: ColumnDef<UserRatedMovie>[] = [
  {
    accessorKey: "movie.name",
    header: "Movie",
  },
  {
    accessorKey: "movie.averageRating",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="[&_svg]:size-5 flex-col sm:flex-row p-1 gap-2 my-2 mx-0 font-bold text-xl max-w-min sm:max-w-full whitespace-normal h-fit"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Average Rating
            {getSortIcon(column.getIsSorted())}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="[&_svg]:size-5 flex-col sm:flex-row p-1 gap-2 my-2 mx-0 font-bold text-xl max-w-min sm:max-w-full whitespace-normal h-fit"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Your Rating
            {getSortIcon(column.getIsSorted())}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "movie.season",
    header: "Season",
  },
];

interface PersonalRankingProps {
  user: User;
}

export const PersonalRanking: FC<PersonalRankingProps> = ({ user }) => {
  const { personalRankings, isLoading } = useFetchPersonalRanking(user?.id);

  if (isLoading || !personalRankings) {
    return (
      <div className="container mx-auto py-10">
        <TableSkeleton columns={columns} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={personalRankings} />
    </div>
  );
};

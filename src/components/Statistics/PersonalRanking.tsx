import { FC } from "react";
import { useFetchPersonalRanking } from "../../api/movies/PersonalRanking";
import { UserRatedMovie } from "../../types/movie";

import { User } from "../../types/user";
import { getSortIcon } from "@/utils/getSortingIcon";
import { Button } from "../ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { TableSkeleton } from "../Skeletons/SkeletonTable";

const columns: ColumnDef<UserRatedMovie>[] = [
  {
    accessorKey: "movie.name",
    header: "Movie",
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="[&_svg]:size-5 flex-row p-1 gap-2 my-2 mx-0 font-bold text-xl"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Your Rating
          {getSortIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: "movie.season",
    header: "Season",
  },
  {
    accessorKey: "movie.averageRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="[&_svg]:size-5 flex-row p-1 gap-2 my-2 mx-0 font-bold text-xl"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Rating
          {getSortIcon(column.getIsSorted())}
        </Button>
      );
    },
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

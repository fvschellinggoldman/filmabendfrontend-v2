import { SortDirection } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type SortOrder = false | SortDirection;

export function getSortIcon(order: SortOrder) {
  switch (order) {
    case "asc":
      return <ArrowUp className="h-4 w-4" />;
    case "desc":
      return <ArrowDown className="h-4 w-4" />;
    default:
      return <ArrowUpDown className="h-4 w-4" />;
  }
}

import { useFetchArchivedCategories } from "../../api/categories/ArchivedCategories";
import { Category } from "../../types/category";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { Button } from "../ui/button";
import { getSortIcon } from "@/utils/getSortingIcon";
import { caseInsensitiveSort } from "@/utils/caseInsensitiveSort";

const CategoryArchive = () => {
  const { categories } = useFetchArchivedCategories();

  if (!categories) {
    return null;
  }

  const columns: ColumnDef<Category, any>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="[&_svg]:size-4 flex-row p-1 gap-2 my-2 mx-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            {getSortIcon(column.getIsSorted())}
          </Button>
        );
      },
      sortingFn: (
        rowA: Row<Category>,
        rowB: Row<Category>,
        columnId: string
      ) => {
        return caseInsensitiveSort(
          rowA.getValue(columnId)?.toString(),
          rowB.getValue(columnId)?.toString()
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryArchive;

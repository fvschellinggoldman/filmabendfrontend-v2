import { type ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rowCount?: number;
}

export function TableSkeleton<TData, TValue>({
  columns,
  rowCount = 50,
}: TableSkeletonProps<TData, TValue>) {
  // Create an array of n items for skeleton rows
  const skeletonRows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-b-4">
            <TableRow>
              {columns.map((_, index) => (
                <TableHead key={index}>
                  <div className="h-10 flex items-center">
                    <div className="h-4 w-1/4 rounded bg-muted animate-pulse" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <div
                      className={`h-4 rounded bg-muted animate-pulse ${
                        colIndex === 0 ? "w-[200px]" : `w-[80px]`
                      }`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

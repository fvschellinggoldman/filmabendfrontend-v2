import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  claimArchivedCategory,
  useFetchArchivedCategories,
} from "../../api/categories/ArchivedCategories";
import Button from "@mui/material/Button";
import { toast } from "sonner";
import { Typography } from "@mui/material";
import { mutate } from "swr";
import { Category } from "../../types/category";

const EventArchiveOverview = () => {
  const { categories } = useFetchArchivedCategories();

  const claimHandler = (category: Category) => {
    claimArchivedCategory(category.id);
    toast.success(
      `You have successfully claimed ${category.name} as your submission.`
    );
    mutate("/api/past_categories");
  };

  if (!categories) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Category archive table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "2px solid black" }}>
              <Typography variant="h5"> Past Events</Typography>
            </TableCell>
            <TableCell
              sx={{ borderBottom: "2px solid black" }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">
                {!category.submitterId && (
                  <Button
                    variant="contained"
                    onClick={() => claimHandler(category)}
                  >
                    Claim
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventArchiveOverview;

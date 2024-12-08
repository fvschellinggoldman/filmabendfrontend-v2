import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useFetchPersonalRanking } from "../../api/movies/PersonalRanking";
import { UserRatedMovie } from "../../types/movie";

import styles from "./PersonalRanking.module.scss";
import { User } from "../../types/user";

const sortData = (
  data: UserRatedMovie[],
  order: "asc" | "desc",
  orderBy: keyof UserRatedMovie | "movie.averageRating"
): UserRatedMovie[] => {
  return data.sort((a, b) => {
    const aValue = orderBy.includes(".")
      ? (a.movie as any)[orderBy.split(".")[1]]
      : (a as any)[orderBy];
    const bValue = orderBy.includes(".")
      ? (b.movie as any)[orderBy.split(".")[1]]
      : (b as any)[orderBy];

    if (bValue < aValue) {
      return order === "asc" ? -1 : 1;
    }
    if (bValue > aValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

interface PersonalRankingProps {
  user: User;
}

export const PersonalRanking: FC<PersonalRankingProps> = ({ user }) => {
  const { personalRankings } = useFetchPersonalRanking(user?.id);

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<
    keyof UserRatedMovie | "movie.averageRating"
  >("movie.averageRating");

  if (personalRankings === undefined) {
    return null;
  }

  const handleRequestSort = (
    property: keyof UserRatedMovie | "movie.averageRating"
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? sortData(personalRankings, order, orderBy)
    : personalRankings;

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell className={styles.TableHeadCell}>Movie</TableCell>
          <TableCell align="center" className={styles.TableHeadCell}>
            <TableSortLabel
              active={orderBy === "rating"}
              direction={orderBy === "rating" ? order : "asc"}
              onClick={() => handleRequestSort("rating")}
            >
              Rating
            </TableSortLabel>
          </TableCell>
          <TableCell className={styles.TableHeadCell} align="center">
            Season
          </TableCell>
          <TableCell className={styles.TableHeadCell} align="center">
            <TableSortLabel
              active={orderBy === "movie.averageRating"}
              direction={orderBy === "movie.averageRating" ? order : "asc"}
              onClick={() => handleRequestSort("movie.averageRating")}
            >
              Average Rating
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((personalRanking) => (
          <TableRow
            key={`${personalRanking.userId}_${personalRanking.movie.id}`}
            className={styles.TableRow}
          >
            <TableCell component="th" scope="row">
              {personalRanking.movie.name}
            </TableCell>
            <TableCell align="center">{personalRanking.rating}</TableCell>
            <TableCell align="center">{personalRanking.movie.season}</TableCell>
            <TableCell align="center">
              {personalRanking.movie.averageRating}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

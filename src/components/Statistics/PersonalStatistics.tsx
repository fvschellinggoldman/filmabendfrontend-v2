import { Typography } from "@mui/material";
import React from "react";
import { useFetchUser } from "../../api/users/Users";
import { PersonalRanking } from "./PersonalRanking";

import { PersonalStatisticsContainer } from "./PersonalStatisticsContainer";

export const PersonalStatistics = () => {
  const { user, isError } = useFetchUser();

  if (user === undefined || isError !== undefined) {
    return null;
  }

  return (
    <>
      <Typography variant="h3">Personal Ranking & Statistics</Typography>
      <PersonalStatisticsContainer user={user} />
      <PersonalRanking user={user} />
    </>
  );
};

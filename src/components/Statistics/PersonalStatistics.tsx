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
      <PersonalStatisticsContainer user={user} />
      <PersonalRanking user={user} />
    </>
  );
};

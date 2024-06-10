import React, { FC } from "react";
import { useFetchPersonalStatistics } from "../../api/users/PersonalStatistics";
import { User } from "../../types/user";
import { PersonalStatisticCard } from "./PersonalStatisticCard";

import styles from "./PersonalStatisticsCardContainer.module.scss";

interface PersonalStatisticsContainerProps {
  user: User;
}

export const PersonalStatisticsContainer: FC<
  PersonalStatisticsContainerProps
> = ({ user }) => {
  const { statistics } = useFetchPersonalStatistics(user.id);

  if (statistics === undefined) {
    return null;
  }

  return (
    <div className={styles.PersonalStatisticCardContainer}>
      {statistics.map((statistic) => (
        <div className={styles.PersonalStatisticCard} key={statistic.title}>
          <PersonalStatisticCard
            title={statistic.title}
            content={statistic.content}
          />
        </div>
      ))}
    </div>
  );
};

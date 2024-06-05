import { Typography } from "@mui/material";
import React from "react";
import { PersonalRanking } from "./PersonalRanking";
import { PersonalStatisticCard } from "./PersonalStatisticCard";

import styles from "./PersonalStatisticsCard.module.scss";

export const PersonalStatistics = () => {
  return (
    <>
      <Typography variant="h3">Personal Ranking & Statistics</Typography>
      <div className={styles.PersonalStatisticCardContainer}>
        <div className={styles.PersonalStatisticCard}>
          <PersonalStatisticCard title="Test" content="This is a test" />
        </div>
        <div className={styles.PersonalStatisticCard}>
          <PersonalStatisticCard
            title="Test"
            content="This is a tedwqdwqdwqst"
          />
        </div>
        <div className={styles.PersonalStatisticCard}>
          <PersonalStatisticCard title="Test" content="This is a fqwfqwftest" />
        </div>
      </div>
      <PersonalRanking />
    </>
  );
};

import React, { FC } from "react";
import { useFetchPersonalStatistics } from "../../api/users/PersonalStatistics";
import { User } from "../../types/user";
import { PersonalStatisticCard } from "./PersonalStatisticCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PersonalStatisticsCardContainer.module.scss";
import { isMobile } from "react-device-detect";

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

  return isMobile ? (
    <div className={styles.MobilePersonalStatisticCardContainer}>
      <Slider
        infinite={true}
        centerPadding="60px"
        className="center"
        swipeToSlide={true}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {statistics.map((statistic) => (
          <div className={styles.PersonalStatisticCard} key={statistic.title}>
            <PersonalStatisticCard
              title={statistic.title}
              content={statistic.content}
            />
          </div>
        ))}
      </Slider>
    </div>
  ) : (
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

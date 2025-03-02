import { FC } from "react";
import { useFetchPersonalStatistics } from "../../api/users/PersonalStatistics";
import { User } from "../../types/user";
import { PersonalStatisticCard } from "./PersonalStatisticCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    <div className={"py-4 h-full"}>
      <Slider
        infinite={true}
        centerPadding="60px"
        className="center"
        swipeToSlide={true}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {statistics.map((statistic) => (
          <div
            className={"w-1/3 flex justify-center items-center h-full"}
            key={statistic.title}
          >
            <PersonalStatisticCard
              title={statistic.title}
              content={statistic.content}
            />
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    <div className={"flex justify-around w-full py-4 h-full"}>
      {statistics.map((statistic) => (
        <div
          className={"w-1/3 flex justify-center items-center h-full"}
          key={statistic.title}
        >
          <PersonalStatisticCard
            title={statistic.title}
            content={statistic.content}
          />
        </div>
      ))}
    </div>
  );
};

import { ReactNode } from "react";

interface KeyMovieDataProps {
  icon: ReactNode;
  iconLabel: string;
  value: string;
}

const KeyMovieData = ({ icon, iconLabel, value }: KeyMovieDataProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex gap-1">
        {icon}
        {iconLabel}
      </div>
      {value}
    </div>
  );
};
export default KeyMovieData;

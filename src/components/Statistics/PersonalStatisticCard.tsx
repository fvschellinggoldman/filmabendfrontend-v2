import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
interface PersonalStatisticCardProps {
  title: string;
  content: string;
}

export const PersonalStatisticCard: FC<PersonalStatisticCardProps> = ({
  title,
  content,
}) => {
  return (
    <Card className="flex flex-col grow justify-center mx-2">
      <CardHeader>
        <CardTitle> {title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

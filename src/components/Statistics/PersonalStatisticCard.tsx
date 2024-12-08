import { Card, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";

interface PersonalStatisticCardProps {
  title: string;
  content: string;
}

export const PersonalStatisticCard: FC<PersonalStatisticCardProps> = ({
  title,
  content,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};

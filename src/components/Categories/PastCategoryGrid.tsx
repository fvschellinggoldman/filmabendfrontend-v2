import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Category } from "../../types/category";

export const PastCategoryGrid = () => {
  const pastCategories: Category[] = [];

  return (
    <>
      {pastCategories.map((category) => (
        <Card sx={{ maxWidth: 345 }} key={category.id}>
          <CardMedia
            sx={{ height: 140 }}
            image={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${category.imageUrl}`}
            title="event image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {category.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

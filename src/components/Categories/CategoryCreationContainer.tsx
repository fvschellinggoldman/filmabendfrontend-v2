import { Typography } from "@mui/material";
import { CategoryCreationForm } from "./CategoryCreationForm";
import { PastCategoryGrid } from "./PastCategoryGrid";

export const CategoryCreationContainer = () => {
  return (
    <>
      <CategoryCreationForm></CategoryCreationForm>
      <Typography variant="h2"> Your past categories </Typography>
      <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
        Coming soon
      </Typography>
      <PastCategoryGrid></PastCategoryGrid>
    </>
  );
};

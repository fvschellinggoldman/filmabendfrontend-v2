import { Typography } from "@mui/material";
import { useRemainingCategory } from "../../api/categories/Categories";
import CategoryCreationInterface from "./CategoryCreationInterface";
import { PastCategoryGrid } from "./PastCategoryGrid";

export const CategoryCreationContainer = () => {
  const { remainingCategories } = useRemainingCategory();

  return (
    <>
      <Typography variant="h4">
        You have {remainingCategories} left to write this season.
      </Typography>
      {remainingCategories && remainingCategories > 0 && (
        <CategoryCreationInterface></CategoryCreationInterface>
      )}
      <Typography variant="h2"> Your past categories </Typography>
      <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
        Coming soon
      </Typography>
      <PastCategoryGrid></PastCategoryGrid>
    </>
  );
};

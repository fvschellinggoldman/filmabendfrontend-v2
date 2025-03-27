import { useRemainingCategory } from "../../api/categories/Categories";
import CategoryCreationInterface from "./CategoryCreationInterface";
import { PastCategoryGrid } from "./PastCategoryGrid";
import { Large, Small } from "shadcn-typography";

export const CategoryCreationContainer = () => {
  const { remainingCategories } = useRemainingCategory();

  return (
    <>
      <p className="text-xl">
        You have {remainingCategories} categories left to write this season.
      </p>
      {remainingCategories !== undefined && remainingCategories > 0 && (
        <CategoryCreationInterface />
      )}
      <Large> Your past categories </Large>
      <Small className="italic">Coming soon</Small>
      <PastCategoryGrid></PastCategoryGrid>
    </>
  );
};

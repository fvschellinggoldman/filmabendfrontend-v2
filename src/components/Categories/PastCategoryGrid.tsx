import { Category } from "../../types/category";
import { Card, CardContent } from "../ui/card";

export const PastCategoryGrid = () => {
  const pastCategories: Category[] = [];

  return (
    <>
      {pastCategories.map((category) => (
        <Card className="max-w-[345px]" key={category.id}>
          <img
            src={`https://filmabend-bucket.s3.eu-central-1.amazonaws.com/${category.imageUrl}`}
            className="h-[140px]"
          />
          <CardContent>{category.name}</CardContent>
        </Card>
      ))}
    </>
  );
};

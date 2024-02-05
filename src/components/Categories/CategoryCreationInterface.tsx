import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { postFile } from "../../api/api";
import { toast } from "sonner";
import {
  Container,
  Typography,
  Button,
  TextField,
  Input,
  FormHelperText,
} from "@mui/material";
import styles from "./CategoryCreationInterface.module.scss";
import { mutate } from "swr";

type ICategoryCreationFormInput = {
  name: string;
  categoryImage: File[];
  date: Date;
};

interface CategoryCreationInterfaceProps {}

const CategoryCreationInterface: FC<CategoryCreationInterfaceProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryCreationFormInput>();

  const onSubmit = async (data: ICategoryCreationFormInput) => {
    const formData = new FormData();
    formData.append("category_image", data.categoryImage[0]);
    formData.append("name", data.name);
    toast.success(`Category ${data.name} has been submitted!`);
    mutate("/api/remaining_categories");
    await postFile("/api/category", formData);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" padding={5}>
        Create Category
      </Typography>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", { required: "Category is required" })}
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            className={styles.formField}
          />
          {/* Category Image */}
          <Input
            {...register("categoryImage")}
            type="file"
            fullWidth
            error={!!errors.categoryImage}
            className={`${styles.formField} ${styles.fileInput}`}
          />
          {/* Validation Errors */}
          {errors.categoryImage && (
            <FormHelperText error>
              {errors.categoryImage.message}
            </FormHelperText>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${styles.formField} ${styles.submitButton}`}
          >
            Submit Category
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CategoryCreationInterface;

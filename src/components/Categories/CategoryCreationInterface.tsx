import { useRef, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postFile } from "../../api/api";
import { toast } from "sonner";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  categoryImage: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Category image is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type CategoryCreationInterfaceProps = {};

const CategoryCreationInterface: FC<CategoryCreationInterfaceProps> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("category_image", data.categoryImage[0]);
    formData.append("name", data.name);

    toast.promise(postFile("/api/category", formData), {
      loading: `Submitting category '${data.name}' ...`,
      success: () => {
        form.reset({ name: undefined, categoryImage: undefined });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        mutate("/api/remaining_categories");
        return `Your category '${data.name}' has successfully been submitted.`;
      },
      error: `Error while submitting your category '${data.name}'`,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center py-10">Create Category</h1>
      <div className="flex flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryImage"
              render={({ field: { onChange } }) => (
                <FormItem className="text-left">
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Category
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CategoryCreationInterface;

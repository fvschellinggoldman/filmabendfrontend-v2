import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(10, { message: "Username cannot be more than 10 characters." }),
    password: z.string().nonempty({ message: "Please set a password" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    const tokenDetails: Record<string, string> = await loginRequest(
      "/api/users/register",
      {
        username,
        password,
      }
    );

    if (!tokenDetails.detail) {
      login(tokenDetails.access_token);
      navigate("/home");
    } else {
      alert(tokenDetails.detail);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  className="bg-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

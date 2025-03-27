import { useAuth } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(10, { message: "Username cannot be more than 10 characters." }),
  password: z.string().nonempty({ message: "Please set a password" }),
  remember: z.boolean(),
});

const LoginForm = () => {
  const { login } = useAuth();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password, remember } = values;
    const tokenDetails: Record<string, string> = await loginRequest("/token", {
      username,
      password,
      remember,
    });

    if (!tokenDetails.detail) {
      login(tokenDetails.access_token);
    } else {
      alert(tokenDetails.detail);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="remember"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2 justify-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm">Keep me logged in?</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;

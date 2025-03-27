import React, { FC, useState } from "react";
import { User } from "../../types/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomAvatar } from "./CustomAvatar";
import { mutate } from "swr";
import { putRequestFile } from "../../api/api";
import { toast } from "sonner";
import { DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Small } from "shadcn-typography";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { TooltipContent, TooltipTrigger, Tooltip } from "../ui/tooltip";
import { Switch } from "../ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface ProfileSettingsProps {
  onClose: () => void;
  user: User;
}

const formSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters."),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    enableSafeMode: z.boolean(),
    profilePicture: z.instanceof(File).optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const ProfileSettings: FC<ProfileSettingsProps> = ({
  onClose,
  user,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleToolTipClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user.displayName || "",
      password: "",
      confirmPassword: "",
      enableSafeMode: user.userPreference?.enableSafeMode ?? true,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.password) formData.append("password", data.password);
    formData.append("display_name", data.displayName);
    formData.append("enable_safe_mode", data.enableSafeMode.toString());
    if (data.profilePicture)
      formData.append("profile_picture", data.profilePicture);
    toast.promise(putRequestFile("/api/user/edit_user_settings", formData), {
      loading: "Updating your profile ...",
      success: () => {
        return "You have successfully updated your profile.";
      },
      error: `Error while updating your profile`,
    });
    mutate("/api/users/me");
    handleModalClose();
  };

  const handleModalClose = () => {
    form.reset();
    onClose();
  };

  return (
    <DialogContent className="w-max rounded sm:px-10">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="pb-2">
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
              <CustomAvatar user={user} setValue={form.setValue} />
              <div className="flex flex-row gap-2">
                <Switch
                  checked={form.watch("enableSafeMode")}
                  onCheckedChange={(checked) =>
                    form.setValue("enableSafeMode", checked)
                  }
                />
                <div className="flex flex-row justify-center items-center gap-1">
                  <Small>Safe Mode</Small>
                  <Tooltip open={showTooltip}>
                    <TooltipTrigger>
                      <Info
                        size={20}
                        onClick={handleToolTipClick}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onTouchStart={handleToolTipClick}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Get asked for confirmation before irreversible actions.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-slate-100" {...field} />
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
                        type="password"
                        placeholder="New Password"
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
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-slate-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button type="reset" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

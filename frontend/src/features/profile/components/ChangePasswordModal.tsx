import Button from "@/components/ui/Button";
import { Lock, X } from "lucide-react";
import { closeChangePasswordModal } from "../slice";
import { useDispatch } from "react-redux";
import Input from "@/components/ui/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema, TChangePasswordSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

function ChangePasswordModal() {
  const dispatch = useDispatch();
  const methods = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TChangePasswordSchema> = (data) => {
    console.log(data);
    dispatch(closeChangePasswordModal());
  };

  return (
    <div className="container-card max-w-md w-full bg-white dark:bg-zinc-800 !space-y-5 relative">
      <Button
        variant="icon"
        title="Close Modal"
        className="absolute right-2.5 top-2.5"
        type="button"
        onClick={() => dispatch(closeChangePasswordModal())}
      >
        <X />
      </Button>

      <div>
        <h3 className="header-text text-lg sm:text-xl flex items-center gap-2">
          <Lock className="size-5 sm:size-6" /> Change Password
        </h3>
        <p className="text-color-light mt-2.5">Update your password to keep your account secure.</p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <Input<TChangePasswordSchema>
              title="Current Password"
              label="currentPassword"
              type="password"
              placeholder="Enter your current password"
              spacing={"sm"}
            />
            <Input<TChangePasswordSchema>
              title="New Password"
              label="newPassword"
              type="password"
              placeholder="Enter your new password"
              spacing={"sm"}
            />
            <Input<TChangePasswordSchema>
              title="Confirm New Password"
              label="confirmNewPassword"
              type="password"
              placeholder="Confirm your new password"
              spacing={"sm"}
            />
          </div>

          <div className="text-zinc-800 dark:text-zinc-200/75">
            <p className="text-sm">Password requirements:</p>
            <ul className="list-disc ml-8 text-[13px]">
              <li>At least 8 characters long</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One lowercase letter (a-z)</li>
              <li>One number (0-9)</li>
              <li>One special character (!@#$%^&*)</li>
            </ul>
          </div>

          <div className="text-right space-x-3 pt-0.5">
            <Button
              variant="outline"
              type="button"
              className="!py-1.5 !px-2"
              onClick={() => dispatch(closeChangePasswordModal())}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="!py-1.5 !px-2">
              Change Password
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ChangePasswordModal;

import { closeChangePasswordModal, sendChangePasswordRequest } from "../slice";
import { useDispatch } from "react-redux";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema, TChangePasswordSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useActionWithToast } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Input, ModalWrapper } from "@/components";

function ChangePasswordModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { executeAction } = useActionWithToast<void, TChangePasswordSchema>();
  const methods = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TChangePasswordSchema> = async (data) => {
    await executeAction({
      action: sendChangePasswordRequest(data),
      loadingMessage: "Updating your password...",
      successMessage: "Password updated! Please log in again.",
    });
    dispatch(closeChangePasswordModal());
    navigate("/login");
  };

  return (
    <ModalWrapper
      icon={Lock}
      handleCloseAction={() => dispatch(closeChangePasswordModal())}
      title="Change Password"
      subtitle="Update your password to keep your account secure."
      iconSmall
    >
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
    </ModalWrapper>
  );
}

export default ChangePasswordModal;

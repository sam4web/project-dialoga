import { Camera, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUpdateUserDTO, IUser, TUpdateProfileSchema, updateProfileSchema } from "../types";
import { selectUserData, sendUpdateUserProfileRequest } from "../slice";
import { useActionWithToast } from "@/hooks";
import { Button, CardTitle, Input, UserAvatar } from "@/components";
import { showUpdateProfileImageModal } from "@/app/slices";

function ProfileUpdateCard() {
  const user = useSelector(selectUserData);
  const { executeAction } = useActionWithToast<IUser, IUpdateUserDTO>();
  const dispatch = useDispatch();
  const methods = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      statusMessage: user?.statusMessage || "",
    },
  });
  const { isDirty } = methods.formState;

  const onSubmit = async (data: IUpdateUserDTO) => {
    await executeAction({
      action: sendUpdateUserProfileRequest(data),
      loadingMessage: "Updating your profile...",
      successMessage: "Success! Profile updated.",
    });
  };

  return (
    <div className="container-card">
      <CardTitle title="Profile Information" icon={User} />

      <div className="flex items-center space-x-4">
        <div className="relative">
          {user && (
            <UserAvatar
              className="size-16! sm:size-20! text-2xl! sm:text-3xl!"
              src={user.profileImage ? user.profileImage : ""}
              alt="profile image"
              fullname={user.fullname}
            />
          )}
          <button
            className="absolute -bottom-1 -right-1 bg-zinc-50/90 dark:bg-zinc-700 p-1.5 rounded-full cursor-pointer"
            title="Update profile image"
            onClick={() => dispatch(showUpdateProfileImageModal())}
          >
            <Camera className="text-color-primary size-5" />
          </button>
        </div>
        <div className="sm:space-y-0.5">
          <p className="header-text text-lg sm:text-xl">{user?.fullname}</p>
          <p className="text-color-light">{user?.email}</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-2 sm:space-y-4.5 mb-4 sm:mb-6">
            <div className="flex space-x-3 items-start">
              <Input<TUpdateProfileSchema> title="Full Name" label="fullname" spacing={"sm"} />
              <Input<TUpdateProfileSchema> title="Email" label="email" type="email" spacing={"sm"} />
            </div>
            <Input<TUpdateProfileSchema> title="Status Message" label="statusMessage" spacing={"sm"} />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={!isDirty}>
            Update Profile
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default ProfileUpdateCard;

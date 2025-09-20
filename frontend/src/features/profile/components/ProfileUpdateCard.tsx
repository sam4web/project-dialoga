import { Camera, User } from "lucide-react";
import CardTitle from "@/components/shared/CardTitlte";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { TUpdateProfileSchema, updateProfileSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, showUpdateProfileImageModal } from "../slice";

function ProfileUpdateCard() {
  const user = useSelector(selectUserData);
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

  const onSubmit: SubmitHandler<TUpdateProfileSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="container-card">
      <CardTitle title="Profile Information" icon={User} />

      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src="https://picsum.photos/500/500"
            alt="profile image"
            className="size-16 sm:size-20 shadow-sm rounded-full"
          />
          <button
            className="absolute -bottom-1 -right-1 bg-zinc-50/90 dark:bg-zinc-700 p-1.5 rounded-full cursor-pointer"
            title="Update profile image"
            onClick={() => dispatch(showUpdateProfileImageModal())}
          >
            <Camera className="text-color-primary size-5" />
          </button>
        </div>
        <div className="sm:space-y-0.5">
          <p className="header-text text-lg sm:text-xl">John Doe</p>
          <p className="text-color-light">john@example.com</p>
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

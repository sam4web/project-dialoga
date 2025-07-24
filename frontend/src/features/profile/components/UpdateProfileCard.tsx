import { Camera, User } from "lucide-react";
import ProfileCardTitle from "./ProfileCardTitle";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function UpdateProfileCard() {
  const methods = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="profile-card">
      <ProfileCardTitle title="Profile Information" icon={User} />

      <div className="flex items-center space-x-4">
        <div className="relative">
          <img src="https://picsum.photos/500/500" alt="profile image" className="size-20 shadow-sm rounded-full" />
          <button className="absolute -bottom-1 -right-1 bg-gray-50/90 dark:bg-gray-700 p-1.5 rounded-full cursor-pointer">
            <Camera className="text-color-primary size-5" />
          </button>
        </div>
        <div className="space-y-0.5">
          <p className="header-text text-xl">John Doe</p>
          <p className="text-color-light">john@example.com</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-4.5 mb-6">
            <div className="flex-center space-x-3">
              <Input title="Full Name" label="full name" spacing={"sm"} />
              <Input title="Email" label="email" type="email" spacing={"sm"} />
            </div>
            <Input title="Status Message" label="status message" spacing={"sm"} />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Update Profile
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default UpdateProfileCard;

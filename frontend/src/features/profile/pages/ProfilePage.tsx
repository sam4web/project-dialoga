import Header from "@/components/shared/Header";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useTheme from "@/hooks/useTheme";
import useTitle from "@/hooks/useTitle";
import { User, LucideIcon, Camera, Settings } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import ThemeToggle from "../../../components/ui/ThemeToggle";

function TitleText({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <h3 className="header-text text-2xl flex items-center gap-3">
      <Icon className="size-6" /> {title}
    </h3>
  );
}

function ProfilePage() {
  useTitle({ title: "Profile", template: true });
  const { theme } = useTheme();
  const methods = useForm();

  return (
    <>
      <Header title="Profile" />
      <div className="container max-w-2xl mx-auto my-5 space-y-5 sm:space-y-7">
        <div className="border border-gray-400/30 shadow-sm rounded-xl px-3 sm:px-6 py-4 sm:py-7 space-y-4 sm:space-y-6">
          <TitleText title="Profile Information" icon={User} />

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
            <form>
              <div className="space-y-4.5 mb-6">
                <div className="flex-center space-x-3">
                  <Input title="Full Name" label="full name" spacing={"sm"} />
                  <Input title="Email" label="email" type="email" spacing={"sm"} />
                </div>
                <Input title="Status Message" label="status message" spacing={"sm"} />
              </div>
              <Button type="submit" varient="primary" className="w-full">
                Update Profile
              </Button>
            </form>
          </FormProvider>
        </div>

        <div className="border border-gray-400/30 shadow-sm rounded-xl px-3 sm:px-6 py-4 sm:py-7 space-y-4 sm:space-y-6">
          <TitleText title="Privacy & Settings" icon={Settings} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-color-primary font-medium">Dark Mode</p>
              <p className="text-color-light text-sm">Currently using {theme} theme</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

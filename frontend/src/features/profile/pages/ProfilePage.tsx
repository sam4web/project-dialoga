import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";
import UpdateProfileCard from "../components/UpdateProfileCard";
import SettingProfileCard from "../components/SettingProfileCard";
import ActionProfileCard from "../components/ActionProfileCard";

function ProfilePage() {
  useTitle({ title: "Profile", template: true });

  return (
    <>
      <Header title="Profile" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <UpdateProfileCard />
        <SettingProfileCard />
        <ActionProfileCard />
      </div>
    </>
  );
}

export default ProfilePage;

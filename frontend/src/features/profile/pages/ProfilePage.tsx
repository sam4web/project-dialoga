import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";
import UpdateProfileCard from "../components/UpdateProfileCard";
import SettingProfileCard from "../components/SettingProfileCard";

function ProfilePage() {
  useTitle({ title: "Profile", template: true });

  return (
    <>
      <Header title="Profile" />
      <div className="container max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <UpdateProfileCard />
        <SettingProfileCard />
      </div>
    </>
  );
}

export default ProfilePage;

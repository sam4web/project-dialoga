import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";

function ProfilePage() {
  useTitle({ title: "Profile", template: true });

  return (
    <>
      <Header title="Profile" />
      <div className="container space-y-5 sm:space-y-7">Profile Page</div>;
    </>
  );
}

export default ProfilePage;

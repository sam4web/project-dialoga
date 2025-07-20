import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";

function ProfilePage() {
  useTitle({ title: "Profile", template: true });

  return (
    <>
      <Header title="Profile" />
      <div className="container space-y-5 sm:space-y-7">
        <h3 className="text-gray-800 dark:text-primary-light font-semibold text-2xl">Profile Page</h3>
      </div>
      ;
    </>
  );
}

export default ProfilePage;

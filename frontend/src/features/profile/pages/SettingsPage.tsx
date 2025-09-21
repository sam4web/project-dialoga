import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../types";
import { fetchUserProfile, isProfileLoaded } from "../slice";
import { PageLayout, ProfileActionCard, ProfileSettingCard, ProfileUpdateCard } from "../components";
import { useActionWithToast, useTitle } from "@/hooks";
import { Spinner } from "@/components";

function SettingsPage() {
  useTitle({ title: "My Profile", template: true });
  const { executeAction } = useActionWithToast<IUser, void>();
  const isLoaded = useSelector(isProfileLoaded);

  useEffect(() => {
    const fetchUserData = async () => {
      await executeAction({
        action: fetchUserProfile(),
        loadingMessage: "Retrieving your profile details...",
        successMessage: "Profile loaded successfully.",
      });
    };
    if (!isLoaded) fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded)
    return (
      <PageLayout>
        <div className="h-[60vh] flex-center">
          <Spinner />
        </div>
      </PageLayout>
    );

  return (
    <PageLayout>
      <ProfileUpdateCard />
      <ProfileSettingCard />
      <ProfileActionCard />
    </PageLayout>
  );
}

export default SettingsPage;

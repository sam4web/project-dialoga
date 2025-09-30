import { useActionWithToast, useTitle } from "@/hooks";
import { useSelector } from "react-redux";
import { fetchCurrentUserProfile, isProfileLoaded } from "../slice";
import { IUserProfile } from "../types";
import { useEffect } from "react";
import { PageLayout, ProfileActionCard, ProfileSettingCard, ProfileUpdateCard } from "../components";
import { Spinner } from "@/components";

function SettingsPage() {
  useTitle({ title: "My Profile", template: true });
  const { executeAction } = useActionWithToast<IUserProfile, void>();
  const isLoaded = useSelector(isProfileLoaded);

  useEffect(() => {
    const fetchUserData = async () => {
      await executeAction({
        action: fetchCurrentUserProfile(),
        loadingMessage: "Retrieving your profile details...",
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

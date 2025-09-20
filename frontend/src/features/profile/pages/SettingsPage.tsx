import useTitle from "@/hooks/useTitle";
import ProfileUpdateCard from "../components/ProfileUpdateCard";
import ProfileSettingCard from "../components/ProfileSettingCard";
import ProfileActionCard from "../components/ProfileActionCard";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../slice/profileThunks";
import useActionWithToast from "@/hooks/useActionWithToast";
import { IUser } from "../types";
import Spinner from "@/components/common/Spinner";
import PageLayout from "../components/PageLayout";

function SettingsPage() {
  useTitle({ title: "My Profile", template: true });
  const { executeAction } = useActionWithToast<IUser, void>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      await executeAction({
        action: fetchUserProfile(),
        loadingMessage: "Retrieving your profile details...",
        successMessage: "Profile loaded successfully.",
      });
      setLoading(false);
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
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

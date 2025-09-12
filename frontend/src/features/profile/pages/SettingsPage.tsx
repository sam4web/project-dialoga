import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";
import ProfileUpdateCard from "../components/ProfileUpdateCard";
import ProfileSettingCard from "../components/ProfileSettingCard";
import ProfileActionCard from "../components/ProfileActionCard";
import { useSelector } from "react-redux";
import ModalOverlayWrapper from "@/components/shared/ModalOverlayWrapper";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { selectChangePasswordModalState } from "../slice";

function SettingsPage() {
  useTitle({ title: "My Profile", template: true });
  const showChangePasswordModal = useSelector(selectChangePasswordModalState);

  return (
    <>
      {showChangePasswordModal && (
        <ModalOverlayWrapper>
          <ChangePasswordModal />
        </ModalOverlayWrapper>
      )}
      <Header title="Settings & Profile" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <ProfileUpdateCard />
        <ProfileSettingCard />
        <ProfileActionCard />
      </div>
    </>
  );
}

export default SettingsPage;

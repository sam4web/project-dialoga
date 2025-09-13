import Header from "@/components/shared/Header";
import useTitle from "@/hooks/useTitle";
import ProfileUpdateCard from "../components/ProfileUpdateCard";
import ProfileSettingCard from "../components/ProfileSettingCard";
import ProfileActionCard from "../components/ProfileActionCard";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "../components/ChangePasswordModal";
import {
  closeUpdateProfileImageModal,
  selectChangePasswordModalState,
  selectUpdateProfileImageModalState,
} from "../slice";
import FileUploadModal from "@/components/shared/FileUploadModal";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { UserPen } from "lucide-react";

function SettingsPage() {
  useTitle({ title: "My Profile", template: true });
  const showChangePasswordModal = useSelector(selectChangePasswordModalState);
  const showUpdateProfileImageModalState = useSelector(selectUpdateProfileImageModalState);

  const dispatch = useDispatch();

  return (
    <>
      {showChangePasswordModal && <ChangePasswordModal />}
      {showUpdateProfileImageModalState && (
        <ModalWrapper
          icon={UserPen}
          handleCloseAction={() => dispatch(closeUpdateProfileImageModal())}
          title="Update profile picture"
        >
          <FileUploadModal
            handleFileSubmit={(image) => {
              console.log(image);
              dispatch(closeUpdateProfileImageModal());
            }}
          />
        </ModalWrapper>
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

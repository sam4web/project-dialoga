import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "./ChangePasswordModal";
import ModalWrapper from "@/components/shared/ModalWrapper";
import FileUploadModal from "@/components/shared/FileUploadModal";
import {
  closeUpdateProfileImageModal,
  selectChangePasswordModalState,
  selectUpdateProfileImageModalState,
} from "../slice";
import Header from "@/components/shared/Header";
import { UserPen } from "lucide-react";

function PageLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const showChangePasswordModal = useSelector(selectChangePasswordModalState);
  const showUpdateProfileImageModalState = useSelector(selectUpdateProfileImageModalState);

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
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">{children}</div>
    </>
  );
}

export default PageLayout;

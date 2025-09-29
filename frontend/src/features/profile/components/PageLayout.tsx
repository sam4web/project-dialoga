import { useSelector } from "react-redux";
import Header from "@/components/shared/Header";
import { ChangePasswordModal } from "@/features/auth/components";
import { selectChangePasswordModalState, selectUpdateProfileImageModalState } from "@/app/slices";
import UpdateProfileImageModal from "./UpdateProfileImageModal";

function PageLayout({ children }: { children: React.ReactNode }) {
  const showChangePasswordModal = useSelector(selectChangePasswordModalState);
  const showUpdateProfileImageModalState = useSelector(selectUpdateProfileImageModalState);

  return (
    <>
      {showChangePasswordModal && <ChangePasswordModal />}
      {showUpdateProfileImageModalState && <UpdateProfileImageModal />}
      <Header title="Settings & Profile" />
      <section className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">{children}</section>
    </>
  );
}

export default PageLayout;

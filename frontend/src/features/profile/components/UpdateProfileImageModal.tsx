import { closeUpdateProfileImageModal } from "@/app/slices";
import { FileUploadModal, ModalWrapper } from "@/components";
import { useActionWithToast } from "@/hooks";
import { UserPen } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendUpdateUserProfileImageRequest } from "../slice";
import { IUserProfile } from "@shared/types/user";

function UpdateProfileImageModal() {
  const dispatch = useDispatch();
  const { executeAction } = useActionWithToast<IUserProfile, FormData>();

  const handleSubmit = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    await executeAction({
      action: sendUpdateUserProfileImageRequest(formData),
      loadingMessage: "Updating your profile picture...",
      successMessage: "Your avatar has been updated.",
    });
    dispatch(closeUpdateProfileImageModal());
  };

  return (
    <ModalWrapper
      icon={UserPen}
      handleCloseAction={() => dispatch(closeUpdateProfileImageModal())}
      title="Update profile picture"
    >
      <FileUploadModal handleFileSubmit={handleSubmit} />
    </ModalWrapper>
  );
}

export default UpdateProfileImageModal;

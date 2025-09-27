import { sendSignOutRequest } from "@/features/auth/slice";
import { useNavigate } from "react-router-dom";
import { useActionWithToast } from "@/hooks";
import { useDispatch } from "react-redux";
import { Button } from "@/components";
import { showChangePasswordModal } from "@/app/slices";

function ProfileActionCard() {
  const { executeAction } = useActionWithToast<void, void>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await executeAction({
      action: sendSignOutRequest(),
      loadingMessage: "Logging out, please wait...",
      successMessage: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="container-card space-y-0 flex gap-4 flex-wrap sm:flex-nowrap">
      <Button variant="outline" className="w-full" onClick={() => dispatch(showChangePasswordModal())}>
        Change Password
      </Button>
      <Button variant="danger" className="w-full" onClick={() => handleSignout()}>
        Sign out
      </Button>
    </div>
  );
}

export default ProfileActionCard;

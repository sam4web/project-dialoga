import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUserProfile } from "@shared/types";
import { ChatHeader, ChatMessageStart, ChatSideBar } from "../components";
import { useActionWithToast } from "@/hooks";
import { fetchPublicProfile } from "@/features/profile/slice";
import { Spinner } from "@/components";

function StartConversationPage() {
  const { userId } = useParams();
  const { executeAction } = useActionWithToast<IUserProfile, string>();
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await executeAction({
        action: fetchPublicProfile(userId!),
        loadingMessage: "Getting profile details...",
      });
      if (!userProfile) {
        navigate("/chat/new", { replace: true });
        return;
      }
      setSelectedProfile(userProfile as IUserProfile);
    };
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="flex">
      <div className="md:max-w-sm w-full hidden md:block">
        <ChatSideBar />
      </div>
      <div className="flex-1 w-full">
        {!selectedProfile ? (
          <div className="h-full flex-center">
            <Spinner />
          </div>
        ) : (
          <section className="relative h-full">
            <ChatHeader {...selectedProfile} isNew />
            <ChatMessageStart targetUserId={selectedProfile._id} />
          </section>
        )}
      </div>
    </div>
  );
}

export default StartConversationPage;

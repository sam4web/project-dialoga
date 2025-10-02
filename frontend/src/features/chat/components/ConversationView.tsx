import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActionWithToast, useTitle } from "@/hooks";
import { fetchPublicProfile } from "@/features/profile/slice";
import { Spinner } from "@/components";
import { IUserProfile } from "@shared/types/user";
import ChatMessageThread from "./ChatMessageThread";
import ChatHeader from "./ChatHeader";
import ChatMessageStart from "./ChatMessageStart";

function ConversationView({ userId }: { userId: string }) {
  const [searchParams] = useSearchParams();
  const { executeAction } = useActionWithToast<IUserProfile, string>();
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(null);
  const navigate = useNavigate();
  const isNew = searchParams.has("new");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await executeAction({
        action: fetchPublicProfile(userId),
        loadingMessage: "Getting profile details...",
      });
      if (!userProfile) {
        navigate(isNew ? "/chat/new" : "/chat", { replace: true });
        return;
      }
      setSelectedProfile(userProfile as IUserProfile);
    };
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useTitle({ title: selectedProfile ? `Chat with ${selectedProfile.fullname}` : "Chat", template: true });

  if (!selectedProfile) {
    return (
      <div className="h-full flex-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="relative h-full">
      <ChatHeader {...selectedProfile} isNew={isNew} />
      {isNew ? (
        <ChatMessageStart targetUserId={selectedProfile._id} />
      ) : (
        <ChatMessageThread recipientId={selectedProfile._id} />
      )}
    </section>
  );
}

export default ConversationView;

import { useNavigate } from "react-router-dom";
import { useActionWithToast, useTitle } from "@/hooks";
import { IUserProfile } from "@shared/types/user";
import { useEffect, useState } from "react";
import { fetchRecipientProfile } from "../slice";
import { Spinner } from "@/components";
import ChatHeader from "./ChatHeader";
import ChatMessageThread from "./ChatMessageThread";
import { emitSocketEvent } from "@/app/socket";

function ConversationView({ conversationId }: { conversationId: string }) {
  useTitle({ title: "Active Conversation", template: true });
  const { executeAction } = useActionWithToast<IUserProfile, string>();
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (conversationId) {
      emitSocketEvent("chat:join_conversation", conversationId);
    }
    return () => {
      if (conversationId) {
        emitSocketEvent("chat:leave_conversation", conversationId);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await executeAction({
        action: fetchRecipientProfile(conversationId),
      });
      if (!userProfile) {
        navigate("/chat", { replace: true });
        return;
      }
      setSelectedProfile(userProfile as IUserProfile);
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

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
      <ChatHeader profile={selectedProfile} conversationId={conversationId} />
      <div className="h-[78dvh] overflow-y-hidden">
        <ChatMessageThread
          showTypingIndicator={selectedProfile.settings.typingIndicator}
          fullname={selectedProfile.fullname}
          conversationId={conversationId}
        />
      </div>
    </section>
  );
}

export default ConversationView;

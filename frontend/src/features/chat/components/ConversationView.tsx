import { useActionWithToast, useTitle } from "@/hooks";
import { ChatMessageDraft, ChatMessageHeader, ChatMessageInput } from "./index";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPublicProfile } from "@/features/profile/slice";
import { Spinner } from "@/components";
import ChatMessageList from "./ChatMessageList";
import { IUserProfile } from "@shared/types/user";

function ConversationView({ userId }: { userId: string }) {
  const [searchParams] = useSearchParams();
  const { executeAction } = useActionWithToast<IUserProfile, string>();
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(null);
  const isNew = searchParams.has("new");

  useEffect(() => {
    const fetchPublicUserProfile = async () => {
      const userProfile = await executeAction({
        action: fetchPublicProfile(userId),
        loadingMessage: "Getting profile details...",
      });
      setSelectedProfile(userProfile as IUserProfile);
    };

    fetchPublicUserProfile();

    //  if new chat
    //    -> show user chat message draft view
    //    -> if user sends a message hit start-conversation route
    //  else fetch conversation messages

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
      <ChatMessageHeader {...selectedProfile} isNew={isNew} />
      <div className="h-[86dvh] overflow-y-hidden">{isNew ? <ChatMessageDraft /> : <ChatMessageList />}</div>
      <ChatMessageInput />
    </section>
  );
}

export default ConversationView;

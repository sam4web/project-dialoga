import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IChatPartner, IStartConversationRequestDTO, IUserProfile } from "@shared/types";
import { ChatHeader, ChatSideBar, MessageInput } from "../components";
import { useActionWithToast, useTitle } from "@/hooks";
import { fetchPublicProfile } from "@/features/profile/slice";
import { Spinner } from "@/components";
import { sendStartNewConversationRequest } from "../slice";
import { MessageCircleDashed } from "lucide-react";
import { toast } from "react-toastify";

function StartConversationPage() {
  const { userId } = useParams();
  const { executeAction: executefetchProfileAction } = useActionWithToast<IUserProfile, string>();
  const { executeAction: executeStartNewConversationAction } = useActionWithToast<
    IChatPartner,
    IStartConversationRequestDTO
  >();
  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await executefetchProfileAction({
        action: fetchPublicProfile(userId!),
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

  const sendStartConversationMessage = async (data: FormData) => {
    if (data.get("image")) {
      toast.error("Only text messages are allowed to start a new conversation.");
      return;
    }
    const message = data.get("text")?.toString();
    if (!message) {
      toast.error("Message cannot be empty. Please enter some text.");
      return;
    }
    const recipient = await executeStartNewConversationAction({
      action: sendStartNewConversationRequest({ receiverId: userId!, initialMessage: message }),
    });
    navigate(recipient ? `/chat/${recipient.conversationId}` : `/chat`, { replace: true });
    return;
  };

  useTitle({ title: selectedProfile ? `Chat with ${selectedProfile.fullname}` : "Chat", template: true });

  return (
    <div className="flex">
      <div className="md:max-w-sm w-full hidden md:block">
        <ChatSideBar />
      </div>
      <div className="flex-1 h-dvh w-full">
        {!selectedProfile ? (
          <div className="h-full flex-center">
            <Spinner />
          </div>
        ) : (
          <section className="relative h-full">
            <ChatHeader profile={selectedProfile} isNew />
            <div className="h-[86dvh] overflow-y-hidden">
              <div className="h-full flex-center px-2.5">
                <div className="container-card select-none gap-2 dark:opacity-40 opacity-60 lg:gap-4 flex flex-col lg:flex-row flex-center">
                  <MessageCircleDashed className="text-color-light opacity-80 size-16 lg:size-20 m-0" />
                  <p className="text-color-light opacity-80 lg:text-lg max-w-xs">
                    <b>Ready to chat?</b> Send the first message below to begin your conversation.
                  </p>
                </div>
              </div>
              <MessageInput isNew handleSubmit={sendStartConversationMessage} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default StartConversationPage;

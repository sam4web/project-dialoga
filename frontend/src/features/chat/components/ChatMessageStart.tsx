import { MessageCircleDashed } from "lucide-react";
import MessageInput from "./MessageInput";
import { useActionWithToast } from "@/hooks";
import { IConversationRecipient, IStartConversationRequestDTO } from "@shared/types";
import { useNavigate } from "react-router-dom";
import { sendStartNewConversationRequest } from "../slice";

type Props = {
  targetUserId: string;
};

function ChatMessageStart({ targetUserId }: Props) {
  const navigate = useNavigate();
  const { executeAction } = useActionWithToast<IConversationRecipient, IStartConversationRequestDTO>();

  const sendStartConversationMessage = async (message: string) => {
    const data = await executeAction({
      action: sendStartNewConversationRequest({ receiverId: targetUserId, initialMessage: message }),
    });
    navigate(data ? `/chat/${data.conversationId}` : `/chat`, { replace: true });
    return;
  };

  return (
    <div className="h-[86dvh] overflow-y-hidden">
      <div className="h-full flex-center px-2.5">
        <div className="container-card select-none gap-2 dark:opacity-45 opacity-60 lg:gap-4 flex flex-col lg:flex-row flex-center">
          <MessageCircleDashed className="text-color-light opacity-80 size-16 lg:size-20 m-0" />
          <p className="text-color-light opacity-80 lg:text-lg max-w-xs">
            <b>Ready to chat?</b> Send the first message below to begin your conversation.
          </p>
        </div>
      </div>
      <MessageInput isNew sendTextMessage={sendStartConversationMessage} />
    </div>
  );
}

export default ChatMessageStart;

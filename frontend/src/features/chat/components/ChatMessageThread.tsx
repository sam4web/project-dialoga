import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActionWithToast } from "@/hooks";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { fetchConversationMessages } from "../slice";
import { Spinner } from "@/components";
import { selectUserId } from "@/features/auth/slice";
import { IMessage } from "@shared/types";

type Props = {
  conversationId: string;
};

function ChatMessageThread({ conversationId }: Props) {
  const { executeAction } = useActionWithToast<IMessage[], string>();
  const userId = useSelector(selectUserId);
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const messages = await executeAction({
        action: fetchConversationMessages(conversationId),
      });
      setMessages(messages as IMessage[]);
    };
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  if (!messages) {
    return (
      <div className="h-full flex-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 overflow-y-auto h-full chat-container-scrollbar px-2.5 lg:px-5 py-5">
        {messages.map((message) => (
          <MessageBubble key={message._id} {...message} self={userId === message.receiverId} />
        ))}
      </div>
      <MessageInput />
    </>
  );
}

export default ChatMessageThread;

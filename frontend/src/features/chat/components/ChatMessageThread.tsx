import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useActionWithToast } from "@/hooks";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { fetchConversationMessages, sendImageMessageReqest, sendTextMessageReqest } from "../slice";
import { Spinner } from "@/components";
import { selectUserId } from "@/features/auth/slice";
import { IMessage } from "@shared/types";
import { ISendImageMessage, ISendTextMessage } from "../types";
import TypingIndicator from "./TypingIndicator";

type Props = {
  fullname: string;
  conversationId: string;
  showTypingIndicator: boolean;
};

function ChatMessageThread({ fullname, showTypingIndicator, conversationId }: Props) {
  const { executeAction: executeFetchMessagesAction } = useActionWithToast<IMessage[], string>();
  const { executeAction: executeSendTextMessageAction } = useActionWithToast<IMessage, ISendTextMessage>();
  const { executeAction: executeSendImageMessageAction } = useActionWithToast<IMessage, ISendImageMessage>();
  const userId = useSelector(selectUserId);
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const messagesDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await executeFetchMessagesAction({
        action: fetchConversationMessages(conversationId),
      });
      setMessages(messages as IMessage[]);
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    const div = messagesDivRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (data: FormData) => {
    const textMessage = data.get("text")?.toString();
    const imageMessage = data.get("image");
    let message: IMessage | null = null;
    if (textMessage) {
      message =
        (await executeSendTextMessageAction({
          action: sendTextMessageReqest({ message: textMessage, conversationId }),
        })) || null;
    } else if (imageMessage) {
      message =
        (await executeSendImageMessageAction({
          action: sendImageMessageReqest({ message: data, conversationId }),
        })) || null;
    }
    if (!message) {
      return;
    }
    setMessages((prev) => [...prev!, message]);
  };

  if (!messages) {
    return (
      <div className="h-full flex-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <>
      <div ref={messagesDivRef} className="h-full chat-container-scrollbar overflow-y-auto px-2.5 lg:px-5 ">
        <div className="space-y-4 pt-5 pb-2">
          {messages.map((message) => (
            <MessageBubble key={message._id} {...message} self={userId !== message.receiverId} />
          ))}
          <div className="clear-both" />
        </div>
        {showTypingIndicator && <TypingIndicator name={fullname} />}
      </div>
      <MessageInput handleSubmit={sendMessage} />
    </>
  );
}

export default ChatMessageThread;

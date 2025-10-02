import { MessageCircleDashed } from "lucide-react";
import MessageInput from "./MessageInput";

type Props = {
  targetUserId: string;
};

function ChatMessageStart({ targetUserId }: Props) {
  return (
    <div className="h-[86dvh] overflow-y-hidden">
      <div className="h-full flex-center px-2.5">
        <div className="container-card gap-2 lg:gap-4 flex flex-col lg:flex-row flex-center">
          <MessageCircleDashed className="text-color-light opacity-50 size-16 lg:size-20 m-0" />
          <p className="text-color-light opacity-50 lg:text-lg max-w-xs">
            <b>Ready to chat?</b> Send the first message below to begin your conversation.
          </p>
        </div>
      </div>
      <MessageInput isNew handleSubmit={(data, type) => console.log(data, type)} />
    </div>
  );
}

export default ChatMessageStart;

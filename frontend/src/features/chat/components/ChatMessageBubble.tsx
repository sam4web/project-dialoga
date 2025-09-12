import { cx } from "@/lib/utils";
import { formatDistance } from "date-fns/formatDistance";
import { capitalize } from "@/lib/utils";

type ChatMessageBubbleProps = {
  message: string;
  sentTime: string;
  self: boolean;
};

function ChatMessageBubble({ message, sentTime, self }: ChatMessageBubbleProps) {
  return (
    <div
      className={cx(
        "clear-both py-1.5 px-2.5 rounded-md max-w-xs lg:max-w-lg text-wrap",
        self ? "float-right bg-primary" : "float-left bg-zinc-200/70 dark:bg-zinc-700/55"
      )}
    >
      <p className={cx("text-base mb-1.5", self ? "text-primary-light" : "text-color-light")}>{message}</p>
      <p className={cx("text-xs text-right", self ? "text-primary-light" : "text-gray-500 dark:text-gray-300")}>
        {capitalize(formatDistance(new Date(sentTime), new Date(), { addSuffix: true }))}
      </p>
    </div>
  );
}

export default ChatMessageBubble;

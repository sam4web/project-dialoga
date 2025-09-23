import { cx } from "@/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { capitalize } from "@/utils";
import type { TMessage } from "../types";

function ChatMessageBubble({ message, sentTime, sentBy, type }: TMessage) {
  const self = sentBy === "self";
  return (
    <div
      className={cx(
        "clear-both py-1.5 px-2 sm:px-2.5 rounded-lg max-w-64 sm:max-w-xs lg:max-w-lg text-wrap",
        self ? "float-right bg-primary" : "float-left bg-zinc-200/70 dark:bg-zinc-700/55"
      )}
    >
      {type === "text" ? (
        <p className={cx("text-base", self ? "text-primary-light" : "text-color-light")}>{message}</p>
      ) : (
        <img src={message} alt="" className="image-message" />
      )}
      <p
        className={cx(
          "text-sm text-right mt-1.5 opacity-80",
          self ? "text-primary-light" : "text-gray-500 dark:text-gray-300"
        )}
      >
        {capitalize(formatDistanceToNow(new Date(sentTime), { addSuffix: true }))}
      </p>
    </div>
  );
}

export default ChatMessageBubble;

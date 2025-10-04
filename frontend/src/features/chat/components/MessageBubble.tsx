import { cx } from "@/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { capitalize } from "@/utils";
import { IMessage } from "@shared/types";

interface Props extends IMessage {
  self: boolean;
}

function MessageBubble({ type, text, image, createdAt: sentTime, self }: Props) {
  return (
    <div
      className={cx(
        "clear-both py-1.5 px-2 sm:px-2.5 rounded-lg max-w-64 sm:max-w-xs lg:max-w-lg text-wrap",
        self ? "float-right bg-primary" : "float-left bg-zinc-200/70 dark:bg-zinc-700/55"
      )}
    >
      {type === "text" ? (
        <p className={cx("text-base", self ? "text-primary-light" : "text-color-light")}>{text!}</p>
      ) : (
        <img src={image!} alt="" className="image-message mt-1" />
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

export default MessageBubble;

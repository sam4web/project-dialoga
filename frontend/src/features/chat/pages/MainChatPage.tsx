import { useParams } from "react-router-dom";
import { cx } from "@/utils";
import { ConversationView, PlaceholderView, ConversationsList } from "../components";

function MainChatPage() {
  const { chatId } = useParams();

  return (
    <div className="flex">
      <div className={cx("md:max-w-sm w-full", chatId ? "hidden md:block" : "flex-1")}>
        <ConversationsList />
      </div>
      <div className={cx("flex-1 w-full", !chatId ? "hidden md:block" : "")}>
        {chatId ? <ConversationView /> : <PlaceholderView />}
      </div>
    </div>
  );
}

export default MainChatPage;

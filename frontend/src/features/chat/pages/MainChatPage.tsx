import { useParams } from "react-router-dom";
import { cx } from "@/utils";
import { ChatSideBar, ConversationView, PlaceholderView } from "../components";

function MainChatPage() {
  const { conversationId } = useParams();

  return (
    <div className="flex">
      <div className={cx("md:max-w-sm w-full", conversationId ? "hidden md:block" : "flex-1")}>
        <ChatSideBar />
      </div>
      <div className={cx("flex-1 w-full", !conversationId ? "hidden md:block" : "")}>
        {conversationId ? <ConversationView conversationId={conversationId} /> : <PlaceholderView />}
      </div>
    </div>
  );
}

export default MainChatPage;

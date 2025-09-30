import { useParams } from "react-router-dom";
import { cx } from "@/utils";
import { ChatSideBar, ConversationView, PlaceholderView } from "../components";

function MainChatPage() {
  const { userId } = useParams();

  return (
    <div className="flex">
      <div className={cx("md:max-w-sm w-full", userId ? "hidden md:block" : "flex-1")}>
        <ChatSideBar />
      </div>
      <div className={cx("flex-1 w-full", !userId ? "hidden md:block" : "")}>
        {userId ? <ConversationView userId={userId} /> : <PlaceholderView />}
      </div>
    </div>
  );
}

export default MainChatPage;

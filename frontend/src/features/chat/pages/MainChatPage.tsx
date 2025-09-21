import { useParams } from "react-router-dom";
import { cx } from "@/lib/utils";
import { ChatMessageSection, ChatPlaceholderSection, ContactListSidebar } from "../components";

function MainChatPage() {
  const { chatId } = useParams();

  return (
    <div className="flex">
      <div className={cx("md:max-w-sm w-full", chatId ? "hidden md:block" : "flex-1")}>
        <ContactListSidebar />
      </div>
      <div className={cx("flex-1 w-full", !chatId ? "hidden md:block" : "")}>
        {chatId ? <ChatMessageSection /> : <ChatPlaceholderSection />}
      </div>
    </div>
  );
}

export default MainChatPage;

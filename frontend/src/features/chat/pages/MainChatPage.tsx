import ContactListSidebar from "../components/ContactListSidebar";
import ChatPlaceholderSection from "../components/ChatPlaceholderSection";
import { useParams } from "react-router-dom";
import ChatMessageSection from "../components/ChatMessageSection";
import { cx } from "@/lib/utils";

function MainChatPage() {
  const { chatId } = useParams();

  return (
    <div className="flex">
      <div className={cx("md:max-w-sm", chatId ? "hidden md:block w-full" : "flex-1")}>
        <ContactListSidebar />
      </div>
      <div className={cx("flex-1 w-full px-5 block", !chatId ? "hidden md:block" : "")}>
        {chatId ? <ChatMessageSection /> : <ChatPlaceholderSection />}
      </div>
    </div>
  );
}

export default MainChatPage;

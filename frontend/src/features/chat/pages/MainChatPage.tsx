import ContactListSidebar from "../components/ContactListSidebar";
import ChatPlaceholderSection from "../components/ChatPlaceholderSection";

function MainChatPage() {
  return (
    <div className="flex">
      <ContactListSidebar />
      <div className="flex-1 w-full px-5">
        <ChatPlaceholderSection />
      </div>
    </div>
  );
}

export default MainChatPage;

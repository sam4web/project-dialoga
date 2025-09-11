import WelcomeMessage from "@/components/shared/WelcomeMessage";
import Button from "@/components/ui/Button";
import useTitle from "@/hooks/useTitle";
import { Link } from "react-router-dom";

function ChatPlaceholderSection() {
  useTitle({ title: "Welcome", template: true });
  return (
    <section className="w-full h-dvh flex-center">
      <WelcomeMessage
        title="Welcome to Dialoga"
        subtitle="Start a new conversation to connect with someone, or simply select a contact from the sidebar to continue your chat."
      >
        <div className="flex-center gap-4 pt-1">
          <Link to={"/chat/new"} title="Start New Chat">
            <Button variant="primary">Start New Chat</Button>
          </Link>

          <Link to={"/settings"} title="Settings & Profile">
            <Button title="Browse Contacts" variant="outline">
              Settings & Profile
            </Button>
          </Link>
        </div>
      </WelcomeMessage>
    </section>
  );
}

export default ChatPlaceholderSection;

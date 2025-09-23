import { Button, WelcomeMessage } from "@/components";
import { useTitle } from "@/hooks";
import { Link } from "react-router-dom";

function PlaceholderView() {
  useTitle({ title: "Welcome", template: true });

  return (
    <section className="w-full h-dvh flex-center  px-5">
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

export default PlaceholderView;

import { Plus, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, ThemeToggler } from "@/components";
import ChatPartnersList from "./ChatPartnersList";

function ChatSideBar() {
  return (
    <aside className="w-full h-dvh border-r border-zinc-400/50 dark:border-zinc-700 shadow-xs">
      <div className="space-y-5">
        <div className="border-b border-zinc-400/50 dark:border-zinc-700 shadow-xs">
          <div className="py-4 md:py-4.5 px-3.5 md:px-2.5 lg:px-3.5 flex items-center justify-between space-x-1 md:space-x-3">
            <p className="font-medium text-lg md:text-xl text-gray-700 dark:text-primary-light">Chats</p>

            <div className="space-x-0.5">
              <Link to={"/chat/new"} title="New Chat">
                <Button variant="icon" title="New Chat">
                  <Plus />
                </Button>
              </Link>
              <Link to={"/settings"} title="Settings and Profile">
                <Button variant="icon" title="Settings and Profile">
                  <Settings />
                </Button>
              </Link>
              <ThemeToggler />
            </div>
          </div>
        </div>

        <form className="space-x-2 px-3.5 md:px-2.5 lg:px-3.5 pt-1">
          <div className="input-field py-2.5 px-3 rounded-lg flex items-center space-x-2 group focus-within:outline-2">
            <label htmlFor="search">
              <Search className="text-color-primary size-5" />
            </label>
            <input
              className="outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
              id="search"
              placeholder="Search conversations..."
            />
          </div>
        </form>
        <ChatPartnersList />
      </div>
    </aside>
  );
}

export default ChatSideBar;

import Button from "@/components/ui/Button";
import { Paperclip, Send } from "lucide-react";

function ChatMessageInput() {
  return (
    <div className="border-t border-zinc-400/50 absolute bottom-0 left-0 w-full bg-primary-light/70 dark:bg-zinc-900 z-[3]">
      <div className="flex items-center justify-between space-x-2 md:space-x-3 px-2.5 lg:px-4.5 pt-3 md:pt-4 pb-2 md:pb-3">
        <Button variant="icon" title="Upload File">
          <Paperclip />
        </Button>

        <form className="flex-1">
          <input
            className="input-field rounded-lg text-base py-2 px-2.5 focus:outline outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
            id="search"
            placeholder="Type a message..."
          />
        </form>

        <Button variant="icon" title="Send Message" className="!bg-primary !text-primary-light hover:opacity-85">
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatMessageInput;

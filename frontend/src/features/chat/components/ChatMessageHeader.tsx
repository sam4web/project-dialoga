import Button from "@/components/ui/Button";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

type ChatMessageHeaderProps = {
  id: string;
  profileImg: string;
  fullname: string;
  status: string;
};

function ChatMessageHeader({ id, profileImg, fullname, status }: ChatMessageHeaderProps) {
  return (
    <header className="border-b border-zinc-400/50 dark:border-zinc-700 shadow-xs">
      <div className="flex items-center justify-between w-full py-[11px] md:py-[13px] px-2 md:pl-5 md:pr-3.5">
        <div className="flex items-center space-x-2.5">
          <Link to={`/chat`} className="block md:hidden">
            <Button variant="icon" title="Contact List">
              <ChevronLeft />
            </Button>
          </Link>
          <img
            src={profileImg}
            alt={`${name}'s profile image`}
            className="size-12 shadow-sm rounded-full object-cover object-center"
          />
          <div>
            <p className="header-text text-base sm:text-lg">{fullname}</p>
            <p className="text-color-light text-sm">{status}</p>
          </div>
        </div>
        <Link to={`/chat/${id}/info`}>
          <Button variant="icon" title="Chat Info">
            <EllipsisVertical />
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default ChatMessageHeader;

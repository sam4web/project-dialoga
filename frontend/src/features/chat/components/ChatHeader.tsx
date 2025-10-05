import { UserAvatar } from "@/components";
import Button from "@/components/ui/Button";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  _id: string;
  fullname: string;
  profileImage: string | null;
  isNew?: boolean;
};

function ChatHeader({ _id, profileImage, fullname, isNew = false }: Props) {
  return (
    <header className="border-b border-zinc-400/50 dark:border-zinc-700 shadow-xs">
      <div className="flex items-center justify-between w-full py-[11px] md:py-[13px] px-2.5 lg:pl-5 lg:pr-3.5">
        <div className="flex items-center space-x-2.5">
          <Link to={isNew ? "/chat/new" : "/chat"} className="block md:hidden">
            <Button variant="icon" title="Contact List">
              <ChevronLeft />
            </Button>
          </Link>
          <UserAvatar
            className="size-12!"
            src={profileImage ? profileImage : ""}
            alt="profile image"
            fullname={fullname}
          />
          <div>
            <p className="header-text text-base sm:text-lg">{fullname}</p>
            {/* <p className="text-color-light text-sm">{status}</p> */}
          </div>
        </div>

        {!isNew && (
          <Link to={`/chat/${_id}/info`}>
            <Button variant="icon" title="Chat Info">
              <EllipsisVertical />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default ChatHeader;

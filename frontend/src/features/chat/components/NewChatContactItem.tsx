import { Button, UserAvatar } from "@/components";
import { capitalize } from "@/utils";
import { IUserProfile } from "@shared/types";
import { MessageCircle } from "lucide-react";

function NewChatContactItem({ user }: { user: IUserProfile }) {
  return (
    <div className="flex items-center justify-between w-full hover:bg-zinc-200/60 dark:hover:bg-zinc-400/10 cursor-pointer rounded-xl px-1.5 sm:px-2.5 py-2.5 sm:py-3.5">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative">
          <UserAvatar alt={`${user.fullname} profile image`} fullname={user.fullname} src={user?.profileImage || ""} />
          {user.isOnline && user.settings.onlineStatus && (
            <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
          )}
        </div>

        <div>
          <p className="header-text text-base sm:text-lg">{user.fullname}</p>
          {user.statusMessage && <p className="text-color-light text-sm">{capitalize(user.statusMessage)}</p>}
        </div>
      </div>

      <Button variant="icon" className="[&>svg]:size-5" title={`Chat with ${user.fullname}`}>
        <MessageCircle />
      </Button>
    </div>
  );
}

export default NewChatContactItem;

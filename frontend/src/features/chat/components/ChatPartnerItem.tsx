import { UserAvatar } from "@/components";
import { truncate } from "@/utils";
import { IChatPartner } from "@shared/types";
import ms from "ms";
import { Link } from "react-router-dom";

function ChatPartnerItem({ partner }: { partner: IChatPartner }) {
  return (
    <Link to={`/chat/${partner.conversationId}`}>
      <div className="hover:bg-zinc-200/70 dark:hover:bg-zinc-400/15 cursor-pointer rounded-xl px-3 md:px-2.5 lg:px-3 py-3">
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <div className="relative">
            <UserAvatar
              alt={`${partner.fullname} profile image`}
              fullname={partner.fullname}
              src={partner?.profileImage || ""}
            />
            {/* {partner.lastOnline === 0 && (
                  <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
                )} */}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="header-text text-base sm:text-lg">{partner.fullname}</p>
              {/* <p className="text-color-light text-xs">{ms(partner.lastOnline)}</p> */}
              {/* dummy data */}
              <p className="text-color-light text-xs">{ms(1678879)}</p>
            </div>
            {/* <p className="text-color-light text-sm">{truncate(partner.lastMessage, 30)}</p> */}
            {/* dummy data */}
            <p className="text-color-light text-sm">{truncate("Hello", 30)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatPartnerItem;

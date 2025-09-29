import { Button, UserAvatar } from "@/components";
import { capitalize } from "@/utils";
import { MessageCircle } from "lucide-react";
import { IContact } from "../types";

function NewChatContactItem({ contact }: { contact: IContact }) {
  return (
    <div
      key={contact._id}
      className="flex items-center justify-between w-full hover:bg-zinc-200/70 dark:hover:bg-zinc-400/15 cursor-pointer rounded-xl px-1.5 sm:px-2.5 py-2.5 sm:py-3.5"
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative">
          <UserAvatar
            alt={`${contact.fullname} profile image`}
            fullname={contact.fullname}
            src={contact.profileImage}
          />
          {/* {contact.status === "online" && (
            <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
          )} */}
        </div>

        <div>
          <p className="header-text text-base sm:text-lg">{contact.fullname}</p>
          {contact.statusMessage && <p className="text-color-light text-sm">{capitalize(contact.statusMessage)}</p>}
        </div>
      </div>

      <Button variant="icon" className="[&>svg]:size-5" title={`Chat with ${contact.fullname}`}>
        <MessageCircle />
      </Button>
    </div>
  );
}

export default NewChatContactItem;

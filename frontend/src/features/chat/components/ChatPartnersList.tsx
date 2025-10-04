import { useActionWithToast } from "@/hooks";
import { fetchChatPartners, isChatPartnersLoaded, selectChatPartners } from "../slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "@/components";
import { IChatPartner } from "@shared/types";
import ChatPartnerItem from "./ChatPartnerItem";

function ChatPartnersList() {
  const { executeAction } = useActionWithToast<IChatPartner[], void>();
  const chatPartners = useSelector(selectChatPartners);
  const isLoaded = useSelector(isChatPartnersLoaded);

  useEffect(() => {
    const fetchChatList = async () => {
      await executeAction({
        action: fetchChatPartners(),
      });
    };

    if (!isLoaded) fetchChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex-center py-10">
        <Spinner className="size-14!" />
      </div>
    );
  }

  if (!chatPartners || !chatPartners.length) {
    return (
      <div className="space-x-2 px-3.5 md:px-2.5 lg:px-3.5">
        <div className="container-card select-none dark:opacity-45 opacity-60 p-4">
          <p className="text-color-light opacity-80 text-sm lg:text-base">
            <b>No active chats.</b> Start a new conversation to begin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3.5 md:px-2.5 lg:px-3.5 space-y-2">
      {chatPartners.map((partner) => (
        <ChatPartnerItem partner={partner} key={partner._id} />
      ))}
    </div>
  );
}

export default ChatPartnersList;

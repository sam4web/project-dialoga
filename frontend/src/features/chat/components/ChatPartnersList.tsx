import { useActionWithToast } from "@/hooks";
import { fetchChatPartners, isChatPartnersLoaded, selectChatPartners } from "../slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "@/components";
import { IChatPartner } from "@shared/types";
import ChatPartnerItem from "./ChatPartnerItem";
import ContactSearchInput from "./ContactSearchInput";
import useChatSearch from "../hooks/useChatSearch";

function ChatPartnersList() {
  const { executeAction } = useActionWithToast<IChatPartner[], void>();
  const isLoaded = useSelector(isChatPartnersLoaded);
  const { search, setSearch, filteredUsers } = useChatSearch(useSelector(selectChatPartners) || []);

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

  return (
    <>
      <ContactSearchInput
        className="space-x-2 px-3.5 md:px-2.5 lg:px-3.5 pt-1"
        search={search}
        onSearchChange={setSearch}
      />

      <div className="px-3.5 md:px-2.5 lg:px-3.5">
        {!filteredUsers || !filteredUsers.length ? (
          <div className="px-3.5 md:px-2.5 lg:px-3.5">
            <div className="container-card select-none dark:opacity-50 opacity-70 p-4">
              <p className="text-color-light opacity-80 text-sm lg:text-base">
                <b>No active chats.</b> Start a new conversation to begin.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <ChatPartnerItem partner={user} key={user._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatPartnersList;

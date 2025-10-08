import { Header } from "@/components";
import { useActionWithToast, useTitle } from "@/hooks";
import { fetchUnassociatedUsers, isUnassociatedUsersLoaded, selectUnassociatedUsers } from "../slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { IUserProfile } from "@shared/types/user";
import NewChatContactList from "../components/NewChatContactList";
import { ContactSearchInput } from "../components";
import useChatSearch from "../hooks/useChatSearch";

function NewChatPage() {
  useTitle({ title: "Find Contacts", template: true });
  const { executeAction } = useActionWithToast<IUserProfile[], void>();
  const isLoaded = useSelector(isUnassociatedUsersLoaded);
  const { search, setSearch, filteredUsers } = useChatSearch(useSelector(selectUnassociatedUsers) || []);

  useEffect(() => {
    const fetchChatList = async () => {
      await executeAction({
        action: fetchUnassociatedUsers(),
        loadingMessage: "Retrieving contacts...",
      });
    };

    if (!isLoaded) fetchChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <>
      <Header title="New Chat" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-3.5 sm:space-y-4">
        <ContactSearchInput className="container-card sm:p-4.5" search={search} onSearchChange={setSearch} />
        <NewChatContactList isLoaded={isLoaded} users={filteredUsers} />
      </div>
    </>
  );
}

export default NewChatPage;

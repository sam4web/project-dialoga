import { Header } from "@/components";
import { useActionWithToast, useTitle } from "@/hooks";
import { NewChatSearchInput } from "../components";
import { fetchUnassociatedUsers, isUnassociatedUsersLoaded } from "../slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { IUserProfile } from "@shared/types/user";
import NewChatContactList from "../components/NewChatContactList";

function NewChatPage() {
  useTitle({ title: "Find Contacts", template: true });

  const { executeAction } = useActionWithToast<IUserProfile[], void>();
  const isLoaded = useSelector(isUnassociatedUsersLoaded);

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
        <NewChatSearchInput />
        <NewChatContactList />
      </div>
    </>
  );
}

export default NewChatPage;

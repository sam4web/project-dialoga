import { Header, Spinner } from "@/components";
import { useActionWithToast, useTitle } from "@/hooks";
import { NewChatContactItem, NewChatSearchInput } from "../components";
import { fetchUnconnectedUsers, isUnconnectedUsersLoaded, selectUnconnectedUsers } from "../slice";
import { IContact } from "../types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NewChatPage() {
  useTitle({ title: "Find Contacts", template: true });

  const { executeAction } = useActionWithToast<IContact[], void>();
  const contactList = useSelector(selectUnconnectedUsers);
  const isLoaded = useSelector(isUnconnectedUsersLoaded);

  useEffect(() => {
    const fetchChatList = async () => {
      await executeAction({
        action: fetchUnconnectedUsers(),
        loadingMessage: "Retrieving contacts...",
      });
    };

    if (!isLoaded) fetchChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="New Chat" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <NewChatSearchInput />

        <div className="container-card px-1.5 sm:px-3 py-4 space-y-2">
          {!isLoaded ? (
            <div className="flex-center py-10">
              <Spinner />
            </div>
          ) : (
            contactList?.map((contact) => (
              <Link key={contact._id} to={`/chat/${contact._id}?new`}>
                <NewChatContactItem contact={contact} />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default NewChatPage;

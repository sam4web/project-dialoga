import { useActionWithToast } from "@/hooks";
import { IChatListItem } from "../types";
import { fetchConnectedUsers, isConnectedUsersLoaded, selectConnectedUsers } from "../slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ProfileImage, Spinner } from "@/components";
import ms from "ms";
import { truncate } from "@/utils";
import { Link } from "react-router-dom";

function ConnectedUsersList() {
  const { executeAction } = useActionWithToast<IChatListItem[], void>();
  const connectedUsers = useSelector(selectConnectedUsers);
  const isLoaded = useSelector(isConnectedUsersLoaded);

  useEffect(() => {
    const fetchChatList = async () => {
      await executeAction({
        action: fetchConnectedUsers(),
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
    <div className="px-3.5 md:px-2.5 lg:px-3.5 space-y-2">
      {connectedUsers &&
        connectedUsers?.map((contact) => (
          <Link to={`/chat/${contact._id}`} key={contact._id}>
            <div className="hover:bg-zinc-200/70 dark:hover:bg-zinc-400/15 cursor-pointer rounded-xl px-3 md:px-2.5 lg:px-3 py-3">
              <div className="flex items-center space-x-2 sm:space-x-2.5">
                <div className="relative">
                  <ProfileImage alt={`${contact.fullname} profile image`} />
                  {/* {contact.lastOnline === 0 && (
                  <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
                )} */}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="header-text text-base sm:text-lg">{contact.fullname}</p>
                    {/* <p className="text-color-light text-xs">{ms(contact.lastOnline)}</p> */}
                    {/* dummy data */}
                    <p className="text-color-light text-xs">{ms(1678879)}</p>
                  </div>
                  {/* <p className="text-color-light text-sm">{truncate(contact.lastMessage, 30)}</p> */}
                  {/* dummy data */}
                  <p className="text-color-light text-sm">{truncate("Hello", 30)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ConnectedUsersList;

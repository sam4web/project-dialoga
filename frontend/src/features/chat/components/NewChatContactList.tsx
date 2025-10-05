import { useSelector } from "react-redux";
import { isUnassociatedUsersLoaded, selectUnassociatedUsers } from "../slice";
import { Spinner } from "@/components";
import NewChatContactItem from "./NewChatContactItem";
import { Link } from "react-router-dom";

function NewChatContactList() {
  const unassociatedUsers = useSelector(selectUnassociatedUsers);
  const isLoaded = useSelector(isUnassociatedUsersLoaded);

  if (!isLoaded) {
    return (
      <div className="container-card flex-center py-11">
        <Spinner />
      </div>
    );
  }

  if (!unassociatedUsers || !unassociatedUsers.length) {
    return (
      <div className="container-card select-none dark:opacity-50 opacity-70 px-4 py-4 sm:py-5">
        <p className="text-color-light opacity-80 text-sm lg:text-base">
          <b>No users available.</b> Your list of potential chat partners is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div className="container-card px-1.5 sm:px-3 py-3 space-y-2">
      {unassociatedUsers?.map((user) => (
        <Link key={user._id} to={`/chat/new/${user._id}`}>
          <NewChatContactItem user={user} />
        </Link>
      ))}
    </div>
  );
}

export default NewChatContactList;

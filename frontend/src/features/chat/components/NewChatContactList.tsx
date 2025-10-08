import { Spinner } from "@/components";
import { Link } from "react-router-dom";
import { IUserProfile } from "@shared/types";
import NewChatContactItem from "./NewChatContactItem";
import { memo } from "react";

type Props = {
  isLoaded: boolean;
  users: IUserProfile[] | null;
};

const NewChatContactList = memo(function NewChatContactList({ isLoaded, users }: Props) {
  if (!isLoaded) {
    return (
      <div className="container-card flex-center py-11">
        <Spinner />
      </div>
    );
  }

  if (!users || !users.length) {
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
      {users.map((user) => (
        <Link key={user._id} to={`/chat/new/${user._id}`}>
          <NewChatContactItem user={user} />
        </Link>
      ))}
    </div>
  );
});

export default NewChatContactList;

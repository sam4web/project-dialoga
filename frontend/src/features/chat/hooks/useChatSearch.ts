import { useDebounceEffect } from "@/hooks";
import { IChatPartner, IUserProfile } from "@shared/types";
import { useCallback, useState } from "react";

const useChatSearch = <T extends IChatPartner | IUserProfile>(initialData: T[]) => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialData);

  const filterData = useCallback((search: string, users: T[]) => {
    const sanitizedSearch = search.trim().toLowerCase();
    if (!sanitizedSearch) {
      return users;
    }
    return users.filter((user) => {
      const text = `${user.email} ${user.fullname}`.toLowerCase();
      return text.includes(sanitizedSearch);
    });
  }, []);

  useDebounceEffect(
    () => {
      const results = filterData(search, initialData);
      setFilteredUsers(results);
    },
    [search, initialData, filterData],
    350
  );

  return {
    search,
    setSearch,
    filteredUsers,
  };
};

export default useChatSearch;

import Button from "@/components/ui/Button";
import { Plus, Search, Settings } from "lucide-react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { Link } from "react-router-dom";
import ms from "ms";
import { truncate } from "../../../lib/utils";

const mockContactList = [
  {
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    id: "e6f4a8b0-5c3a-4d2e-8c7f-1a9b0c5d6e7f",
    fullName: "John Doe",
    lastMessage: "Hey, how are you doing?",
    lastOnline: 16788864,
  },
  {
    profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
    id: "b2c1d0e8-7a5b-4c3d-9f1a-0b2c3d4e5f6g",
    fullName: "Jane Smith",
    lastMessage: "Sounds good! Talk to you later.",
    lastOnline: 0,
  },
  {
    profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
    id: "f8e7d6c5-4b3a-2d1e-0c9b-8a7b6c5d4e3f",
    fullName: "Peter Jones",
    lastMessage: "Did you get the files I sent?",
    lastOnline: 1678882,
  },
  {
    profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
    id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
    fullName: "Mary Lee",
    lastMessage: "Thanks for your help!",
    lastOnline: 0,
  },
  {
    profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
    id: "c9d8e7f6-5g4h-3i2j-1k0l-9m8n7o6p5q4r",
    fullName: "Robert Davis",
    lastMessage: "What time is the meeting tomorrow?",
    lastOnline: 1678879,
  },
];
function ContactListSidebar() {
  return (
    <aside className="w-full h-dvh border-r border-zinc-400/50 dark:border-zinc-700 shadow-xs">
      <div className="space-y-5">
        <div className="border-b border-zinc-400/50 dark:border-zinc-700 shadow-xs">
          <div className="py-4 md:py-4.5 px-3.5 md:px-2.5 lg:px-3.5 flex items-center justify-between space-x-1 md:space-x-3">
            <p className="font-medium text-lg md:text-xl text-gray-700 dark:text-primary-light">Chats</p>

            <div className="space-x-0.5">
              <Link to={"/chat/new"} title="New Chat">
                <Button variant="icon" title="New Chat">
                  <Plus />
                </Button>
              </Link>
              <Link to={"/settings"} title="Settings and Profile">
                <Button variant="icon" title="Settings and Profile">
                  <Settings />
                </Button>
              </Link>
              <ThemeToggler />
            </div>
          </div>
        </div>

        <form className="space-x-2 px-3.5 md:px-2.5 lg:px-3.5 pt-1">
          <div className="input-field py-2.5 px-3 rounded-lg flex items-center space-x-2 group focus-within:outline-2">
            <label htmlFor="search">
              <Search className="text-color-primary size-5" />
            </label>
            <input
              className="outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
              id="search"
              placeholder="Search conversations..."
            />
          </div>
        </form>

        <div className="px-3.5 md:px-2.5 lg:px-3.5 space-y-2">
          {mockContactList.map((contact) => (
            <Link to={`/chat/${contact.id}`} key={contact.id}>
              <div className="hover:bg-zinc-200/70 dark:hover:bg-zinc-400/15 cursor-pointer rounded-xl px-3 md:px-2.5 lg:px-3 py-3">
                <div className="flex items-center space-x-2 sm:space-x-2.5">
                  <div className="relative">
                    <img
                      src={contact.profileImg}
                      alt={`${contact.fullName} profile image`}
                      className="size-13 shadow-sm rounded-full object-cover object-center"
                    />
                    {contact.lastOnline === 0 && (
                      <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="header-text text-base sm:text-lg">{contact.fullName}</p>
                      <p className="text-color-light text-xs">{ms(contact.lastOnline)}</p>
                    </div>
                    <p className="text-color-light text-sm">{truncate(contact.lastMessage, 30)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ContactListSidebar;

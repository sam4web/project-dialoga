import Header from "@/components/shared/Header";
import Button from "@/components/ui/Button";
import useTitle from "@/hooks/useTitle";
import { capitalize } from "@/lib/utils";
import { MessageCircle, Search } from "lucide-react";

const mockContactList = [
  {
    id: "usr_001",
    fullName: "Alice Johnson",
    profileImg: "https://i.pravatar.cc/150?img=1",
    status: "online",
  },
  {
    id: "usr_002",
    fullName: "Bob Williams",
    profileImg: "https://i.pravatar.cc/150?img=2",
    status: "last seen 2 hrs ago",
  },
  {
    id: "usr_003",
    fullName: "Charlie Brown",
    profileImg: "https://i.pravatar.cc/150?img=3",
    status: "last seen 50 mins ago",
  },
  {
    id: "usr_004",
    fullName: "Diana Miller",
    profileImg: "https://i.pravatar.cc/150?img=4",
    status: "online",
  },
  {
    id: "usr_005",
    fullName: "Eve Davis",
    profileImg: "https://i.pravatar.cc/150?img=5",
    status: "last seen yesterday",
  },
];

function NewChatPage() {
  useTitle({ title: "Find Contacts", template: true });

  return (
    <>
      <Header title="New Chat" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <form className="container-card sm:px-5 sm:py-6 ">
          <div className="input-field py-2.5 px-3 rounded-lg flex space-x-2 group focus-within:outline-2">
            <label htmlFor="search">
              <Search className="text-color-primary" />
            </label>
            <input
              className="outline-none w-full focus:placeholder:text-transparent"
              id="search"
              placeholder="Search for contacts..."
            />
          </div>
        </form>

        <div className="container-card px-1.5 sm:px-3 py-4 space-y-2">
          {mockContactList.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between w-full hover:bg-zinc-100/80 dark:hover:bg-zinc-400/5 cursor-pointer rounded-xl px-1.5 sm:px-2.5 py-2.5 sm:py-3.5"
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <img
                    src={contact.profileImg}
                    alt={`${contact.fullName} profile image`}
                    className="size-14 shadow-sm rounded-full"
                  />
                  {contact.status === "online" && (
                    <div className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full" />
                  )}
                </div>

                <div>
                  <p className="header-text text-base sm:text-lg">{contact.fullName}</p>
                  <p className="text-color-light text-sm">{capitalize(contact.status)}</p>
                </div>
              </div>

              <Button variant="icon" title={`Chat with ${contact.fullName}`}>
                <MessageCircle />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewChatPage;

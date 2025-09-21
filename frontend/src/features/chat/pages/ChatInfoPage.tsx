import { CardTitle, Header } from "@/components";
import useTitle from "@/hooks/useTitle";
import { Image, User } from "lucide-react";
import { ChatInfoCard } from "../components";

function ChatInfoPage() {
  useTitle({ title: "[Contact Name]'s Profile", template: true });

  return (
    <>
      <Header title="Contact Info" />
      <div className="container min-h-full max-w-2xl mx-auto mt-5 space-y-5 sm:space-y-7">
        <div className="container-card">
          <div className="flex-center flex-col space-y-4">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="profile image"
                className="size-20 shadow-sm rounded-full"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 size-5 rounded-full flex-center">
                <div className="size-2.5 bg-zinc-50 rounded-full" />
              </div>
            </div>
            <div className="sm:space-y-0.5">
              <h3 className="header-text text-xl sm:text-2xl">Alice Johnson</h3>
              <div className="flex-center gap-2">
                <div className="bg-green-500 size-3 rounded-full" />
                <p className="text-color-primary font-medium">Online now</p>
              </div>
            </div>
          </div>

          <div className="flex bg-zinc-200/70 dark:bg-zinc-700/60 p-2.5 rounded-lg gap-3">
            <ChatInfoCard value={127} label={"Messages"} />
            <ChatInfoCard value={3} label={"Media"} />
            <ChatInfoCard value={5} label={"Days"} />
          </div>
        </div>

        <div className="container-card">
          <CardTitle title="Contact Detail" icon={User} />
          <div className="space-y-0.5">
            <p className="text-color-light font-medium text-base sm:text-lg">Email</p>
            <p className="text-color-primary font-medium text-sm sm:text-base">alicejohnson@example.com</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-color-light font-medium text-base sm:text-lg">Status</p>
            <p className="text-color-primary font-medium text-sm sm:text-base">Hey, I'm using Dialoga</p>
          </div>
        </div>

        <div className="container-card">
          <CardTitle title="Shared Media" icon={Image} />

          <div className="shared-media-grid">
            <img src="https://picsum.photos/501/500" alt="" className="image-message" />
            <img src="https://picsum.photos/502/500" alt="" className="image-message" />
            <img src="https://picsum.photos/503/500" alt="" className="image-message" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatInfoPage;

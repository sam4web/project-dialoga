import { CardTitle, Header, Spinner, UserAvatar } from "@/components";
import { useActionWithToast, useTitle } from "@/hooks";
import { IConversationDetails } from "@shared/types";
import { Image, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConversationDetails } from "../slice";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="Conversation Details" />
      <section className="container min-h-full max-w-2xl mx-auto mt-5">{children}</section>
    </>
  );
}

function ChatInfoStats({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 rounded-md py-3 px-2 bg-white dark:bg-zinc-800 text-center">
      <p className="header-text text-xl sm:text-2xl font-semibold">{value}</p>
      <p className="text-color-primary font-medium text-sm sm:text-base">{label}</p>
    </div>
  );
}

function ConversationInfoPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { executeAction } = useActionWithToast<IConversationDetails, string>();
  const [chatInfo, setChatInfo] = useState<IConversationDetails | null>(null);

  useEffect(() => {
    const fetchConversationInfo = async () => {
      const conversationDetail = await executeAction({
        action: fetchConversationDetails(conversationId!),
        loadingMessage: "Retrieving chat detail...",
      });
      if (!conversationDetail) {
        navigate(`/chat/${conversationId}`);
        return;
      }
      setChatInfo(conversationDetail);
    };
    fetchConversationInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useTitle({ title: chatInfo ? `${chatInfo.fullname}'s Chat Info` : "Chat Info", template: true });

  if (!chatInfo) {
    return (
      <PageLayout>
        <div className="flex-center py-10">
          <Spinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-5 sm:space-y-7">
        <div className="container-card">
          <div className="flex-center flex-col space-y-4">
            <div className="relative">
              <UserAvatar
                alt={`${chatInfo.fullname} profile image`}
                fullname={chatInfo.fullname}
                src={chatInfo?.profileImage || ""}
                className="size-16! sm:size-20! text-2xl! sm:text-3xl!"
              />
              {/* <div className="absolute bottom-0 right-0 bg-green-500 size-5 rounded-full flex-center">
                <div className="size-2.5 bg-zinc-50 rounded-full" />
              </div> */}
            </div>

            <div className="sm:space-y-0.5">
              <h3 className="header-text text-xl sm:text-2xl text-center">{chatInfo.fullname}</h3>
              {/* TODO: update */}
              <div className="flex-center gap-2">
                <div className="bg-green-500 size-3 rounded-full" />
                <p className="text-color-primary font-medium">Online now</p>
              </div>
            </div>
          </div>

          <div className="flex bg-zinc-200/70 dark:bg-zinc-700/60 p-2.5 rounded-lg gap-3">
            <ChatInfoStats value={chatInfo.stats.messagesSent} label="Messages Sent" />
            <ChatInfoStats value={chatInfo.stats.mediaShared} label="Media Shared" />
            <ChatInfoStats value={5} label="Days Active" />
          </div>
        </div>

        <div className="container-card">
          <CardTitle title="Contact Detail" icon={User} />
          <div className="space-y-0.5">
            <p className="text-color-light font-medium text-base sm:text-lg">Email</p>
            <p className="text-color-primary font-medium text-sm sm:text-base">{chatInfo.details.email}</p>
          </div>
          {chatInfo.details.statusMessage && (
            <div className="space-y-0.5">
              <p className="text-color-light font-medium text-base sm:text-lg">Status Message</p>
              <p className="text-color-primary font-medium text-sm sm:text-base">{chatInfo.details.statusMessage}</p>
            </div>
          )}
        </div>

        <div className="container-card">
          <CardTitle title="Shared Media" icon={Image} />

          <div className="shared-media-grid">
            {chatInfo.sharedMedia.map((image, idx) => (
              <img src={image} alt={`shared-media-${idx}`} className="image-message" />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ConversationInfoPage;

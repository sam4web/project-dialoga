import { useNavigate } from "react-router-dom";
import { useActionWithToast } from "@/hooks";
import { IUserProfile } from "@shared/types/user";

function ConversationView({ conversationId }: { conversationId: string }) {
  // const { executeAction } = useActionWithToast<IUserProfile, string>();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchConversation = async () => {};
  //   fetchConversation();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [conversationId]);

  // useTitle({ title: selectedProfile ? `Chat with ${selectedProfile.fullname}` : "Chat", template: true });

  // if (!selectedProfile) {
  //   return (
  //     <div className="h-full flex-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    // <section className="relative h-full">
    //   <ChatHeader {...selectedProfile} isNew={isNew} />
    //   <ChatMessageThread recipientId={selectedProfile._id} />
    // </section>
    <section>
      <h3 className="text-primary-light">Fetch Conversation Message Thread HERE!!!</h3>
    </section>
  );
}

export default ConversationView;

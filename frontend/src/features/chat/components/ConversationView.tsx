import useTitle from "@/hooks/useTitle";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBubble from "./ChatMessageBubble";
import ChatMessageInput from "./ChatMessageInput";
import { TMessage } from "../types";

const messageDummyData = {
  profile: {
    id: "e6f4a8b0-5c3a-4d2e-8c7f-1a9b0c5d6e7f",
    profileImg: "https://randomuser.me/api/portraits/women/11.jpg",
    fullname: "Alice Johnson",
    status: "Online",
  },
  messages: [
    {
      id: "msg_1",
      message: "Hey, are we still on for the project meeting later?",
      type: "text",
      sentTime: "2025-09-14T10:00:00Z",
      sentBy: "self",
    },
    {
      id: "msg_2",
      message: "Yep! Everything's all set on my end. How's your progress?",
      type: "text",
      sentTime: "2025-09-14T10:01:35Z",
      sentBy: "other",
    },
    {
      id: "msg_3",
      message: "Going well. I just finished the final design mockups.",
      type: "text",
      sentTime: "2025-09-14T10:02:15Z",
      sentBy: "self",
    },
    {
      id: "msg_4",
      message:
        "https://images.pexels.com/photos/10368560/pexels-photo-10368560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "image",
      sentTime: "2025-09-14T10:03:00Z",
      sentBy: "self",
    },
    {
      id: "msg_5",
      message: "Looks great! That's exactly the feel we were going for.",
      type: "text",
      sentTime: "2025-09-14T10:03:55Z",
      sentBy: "other",
    },
    {
      id: "msg_6",
      message: "Thanks! I also found some inspiration images.",
      type: "text",
      sentTime: "2025-09-14T10:04:30Z",
      sentBy: "self",
    },
    {
      id: "msg_7",
      message:
        "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "image",
      sentTime: "2025-09-14T10:05:00Z",
      sentBy: "self",
    },
    {
      id: "msg_8",
      message: "Nice! I'll add these to the mood board.",
      type: "text",
      sentTime: "2025-09-14T10:05:40Z",
      sentBy: "other",
    },
    {
      id: "msg_9",
      message: "What time are you thinking for the meeting?",
      type: "text",
      sentTime: "2025-09-14T10:07:00Z",
      sentBy: "other",
    },
    {
      id: "msg_10",
      message: "Around 2 PM? I have a free slot then.",
      type: "text",
      sentTime: "2025-09-14T10:07:35Z",
      sentBy: "self",
    },
    {
      id: "msg_11",
      message: "Sounds good to me. See you then!",
      type: "text",
      sentTime: "2025-09-14T10:08:00Z",
      sentBy: "other",
    },
    {
      id: "msg_12",
      message: "Just saw this cool meme about code reviews, haha.",
      type: "text",
      sentTime: "2025-09-14T10:15:20Z",
      sentBy: "self",
    },
    {
      id: "msg_13",
      message:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      type: "image",
      sentTime: "2025-09-14T10:15:50Z",
      sentBy: "self",
    },
    {
      id: "msg_14",
      message: "Haha, so relatable! That's exactly how it feels sometimes.",
      type: "text",
      sentTime: "2025-09-14T10:16:30Z",
      sentBy: "other",
    },
    {
      id: "msg_15",
      message: "I know, right? 😂",
      type: "text",
      sentTime: "2025-09-14T10:17:00Z",
      sentBy: "self",
    },
    {
      id: "msg_16",
      message: "Hey, I've got to run to another meeting. Talk later!",
      type: "text",
      sentTime: "2025-09-14T10:30:10Z",
      sentBy: "other",
    },
    {
      id: "msg_17",
      message: "Sounds good. Catch you later.",
      type: "text",
      sentTime: "2025-09-14T10:30:45Z",
      sentBy: "self",
    },
    {
      id: "msg_18",
      message: "Just had a thought about the landing page header.",
      type: "text",
      sentTime: "2025-09-14T11:05:00Z",
      sentBy: "self",
    },
    {
      id: "msg_19",
      message: "Maybe we should add a subtle animation to the hero image.",
      type: "text",
      sentTime: "2025-09-14T11:05:30Z",
      sentBy: "self",
    },
    {
      id: "msg_20",
      message: "I'll mock it up and send it to you after the meeting.",
      type: "text",
      sentTime: "2025-09-13T11:06:00Z",
      sentBy: "self",
    },
  ],
};

function ConversationView() {
  useTitle({ title: "[Contact Name] Chat", template: true });

  return (
    <section className="relative h-full">
      <ChatMessageHeader {...messageDummyData.profile} />

      <div className="h-[86dvh] overflow-y-hidden">
        <div className="space-y-4 overflow-y-auto h-full chat-container-scrollbar px-2.5 lg:px-5 py-5">
          {messageDummyData.messages.map((message: TMessage) => (
            <ChatMessageBubble key={message.id} {...message} />
          ))}
        </div>
      </div>

      <ChatMessageInput />
    </section>
  );
}

export default ConversationView;

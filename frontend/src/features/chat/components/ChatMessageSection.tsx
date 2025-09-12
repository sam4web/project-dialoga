import useTitle from "@/hooks/useTitle";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBubble from "./ChatMessageBubble";
import ChatMessageInput from "./ChatMessageInput";

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
      message: "Hello there!",
      sentTime: "2023-03-15T10:00:00Z",
      sentBy: "self",
    },
    {
      id: "msg_2",
      message: "Hi! How are you?",
      sentTime: "2023-03-15T10:01:00Z",
      sentBy: "other",
    },
    {
      id: "msg_3",
      message: "I'm doing well, thanks. Just wanted to check in.",
      sentTime: "2023-03-15T10:02:00Z",
      sentBy: "self",
    },
    {
      id: "msg_4",
      message: "That's nice of you. I'm doing good too.",
      sentTime: "2023-03-15T10:03:00Z",
      sentBy: "other",
    },
    {
      id: "msg_5",
      message: "Have you seen the new movie?",
      sentTime: "2023-03-15T10:04:00Z",
      sentBy: "self",
    },
    {
      id: "msg_6",
      message: "Not yet. Is it any good?",
      sentTime: "2023-03-15T10:05:00Z",
      sentBy: "other",
    },
    {
      id: "msg_7",
      message: "I really enjoyed it. You should check it out.",
      sentTime: "2023-03-15T10:06:00Z",
      sentBy: "self",
    },
    {
      id: "msg_8",
      message: "Okay, I'll add it to my list.",
      sentTime: "2023-03-15T10:07:00Z",
      sentBy: "other",
    },
    {
      id: "msg_9",
      message: "What are you up to this weekend?",
      sentTime: "2023-03-15T10:08:00Z",
      sentBy: "self",
    },
    {
      id: "msg_10",
      message: "Just relaxing at home. Maybe some gardening.",
      sentTime: "2023-03-15T10:09:00Z",
      sentBy: "other",
    },
    {
      id: "msg_11",
      message: "Sounds peaceful.",
      sentTime: "2023-03-15T10:10:00Z",
      sentBy: "self",
    },
    {
      id: "msg_12",
      message: "It is. How about you?",
      sentTime: "2023-03-15T10:11:00Z",
      sentBy: "other",
    },
    {
      id: "msg_13",
      message: "I have some plans with family.",
      sentTime: "2023-03-15T10:12:00Z",
      sentBy: "self",
    },
    {
      id: "msg_14",
      message: "Nice! Enjoy your time with them.",
      sentTime: "2023-03-15T10:13:00Z",
      sentBy: "other",
    },
    {
      id: "msg_15",
      message: "Thanks, you too!",
      sentTime: "2023-03-15T10:14:00Z",
      sentBy: "self",
    },
    {
      id: "msg_16",
      message: "Did you finish the report?",
      sentTime: "2023-03-15T10:15:00Z",
      sentBy: "other",
    },
    {
      id: "msg_17",
      message: "Yes, just sent it over.",
      sentTime: "2023-03-15T10:16:00Z",
      sentBy: "self",
    },
    {
      id: "msg_18",
      message: "Got it. Thanks for the quick turnaround.",
      sentTime: "2023-03-15T10:17:00Z",
      sentBy: "other",
    },
    {
      id: "msg_19",
      message: "No problem! Let me know if you need any revisions.",
      sentTime: "2023-03-15T10:18:00Z",
      sentBy: "self",
    },
    {
      id: "msg_20",
      message: "Will do.",
      sentTime: "2023-03-15T10:19:00Z",
      sentBy: "other",
    },
    {
      id: "msg_21",
      message: "I'm heading out for lunch. Want to join?",
      sentTime: "2023-03-15T12:00:00Z",
      sentBy: "self",
    },
    {
      id: "msg_22",
      message: "I wish I could, but I have a meeting.",
      sentTime: "2023-03-15T12:01:00Z",
      sentBy: "other",
    },
    {
      id: "msg_23",
      message: "Okay, another time then.",
      sentTime: "2023-03-15T12:02:00Z",
      sentBy: "self",
    },
    {
      id: "msg_24",
      message: "Enjoy your meal!",
      sentTime: "2023-03-15T12:03:00Z",
      sentBy: "other",
    },
    {
      id: "msg_25",
      message: "Did you hear the news?",
      sentTime: "2023-03-15T14:00:00Z",
      sentBy: "self",
    },
    {
      id: "msg_26",
      message: "What news?",
      sentTime: "2023-03-15T14:01:00Z",
      sentBy: "other",
    },
    {
      id: "msg_27",
      message: "The new product launch is ahead of schedule!",
      sentTime: "2023-03-1",
      sentBy: "self",
    },
  ],
};

function ChatMessageSection() {
  useTitle({ title: "[Contact Name] Chat", template: true });

  return (
    <section className="relative h-full">
      <ChatMessageHeader {...messageDummyData.profile} />

      <div className="h-[90dvh] overflow-y-hidden">
        <div className="space-y-4 overflow-y-auto h-full chat-container-scrollbar px-2.5 lg:px-5 py-5">
          {messageDummyData.messages.map((messageObj) => (
            <ChatMessageBubble key={messageObj.id} {...messageObj} self={messageObj.sentBy === "self"} />
          ))}
        </div>
      </div>

      <ChatMessageInput />
    </section>
  );
}

export default ChatMessageSection;

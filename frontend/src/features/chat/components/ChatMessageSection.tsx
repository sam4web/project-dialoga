import useTitle from "@/hooks/useTitle";

function ChatMessageSection() {
  useTitle({ title: "[Contact Name] Chat", template: true });

  return <div>ChatMessageSection</div>;
}

export default ChatMessageSection;

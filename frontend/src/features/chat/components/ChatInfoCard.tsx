function ChatInfoCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 rounded-md py-3 px-2 bg-white dark:bg-zinc-800 text-center">
      <p className="header-text text-xl sm:text-2xl font-semibold">{value}</p>
      <p className="text-color-primary font-medium text-sm sm:text-base">{label}</p>
    </div>
  );
}

export default ChatInfoCard;

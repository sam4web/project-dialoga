function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex-center dark:opacity-80 opacity-90">
      <div className="bg-zinc-200/70 dark:bg-zinc-700/55 px-3 py-2 rounded-lg">
        <div className="text-color-light flex text-sm gap-1.5">
          <span>{name} is typing</span>
          <div className="flex gap-0.5">
            <span className="dot">&bull;</span>
            <span className="dot">&bull;</span>
            <span className="dot">&bull;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
